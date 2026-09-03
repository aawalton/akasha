import { readFileSync } from "node:fs"
import { fileStemOf } from "@akasha/file-page-identity"
import { frontmatter as readBlock } from "@akasha/markdown-pages/document-frontmatter"
import { Source } from "@akasha/markdown-pages/document-position"
import { diskFileTree, type FileTree } from "@akasha/markdown-pages/file-tree"
import { parseFrontmatter, textField } from "@akasha/markdown-pages/frontmatter"
import { addressOf, addressParts } from "@akasha/markdown-pages/page-address"
import { reposOf } from "@akasha/markdown-pages/page-types"
import { compiledPageTypeFor } from "@akasha/markdown-pages/property-frontmatter"
import { registryOf } from "@akasha/markdown-pages/property-registry"
import { bullets, sectionNamed } from "@akasha/markdown-pages/prose"
import { isDirty, targetRoot } from "@akasha/pages-system/checkout-roots"
import type { FrontmatterValue, Repo } from "@akasha/pages-system/markdown-document"
import type { Roots } from "@akasha/pages-system/markdown-page-at"
import { advise, type Outcome, skip } from "@akasha/verdict/outcome"
import type { Patch } from "./mention.ts"
import type { Moves } from "./repoint.ts"

export type Reslugged = ReadonlyMap<string, string>

// Was `SLUG_WORD` in the page index's identity reader, which has gone. The frontmatter key a page
// spells its slug under.
const SLUG_WORD = "slug"

const SLUG_TYPE = /(^|[^-\w])relation-(?:slug|address)\b/

const DEFINITION_HEADING = "Definition"

const TERM_LINE = /^- \*\*(.+?)\*\* — (.+)$/

export interface Definition {
  readonly term: string
  readonly definition: string
}

export function definitionOf(body: string): Definition | null {
  const section = sectionNamed(body, DEFINITION_HEADING)
  const first = section === null ? undefined : bullets(section.body)[0]?.text
  const found = first === undefined ? null : TERM_LINE.exec(first.trim())
  const term = found?.[1]
  const definition = found?.[2]
  return term === undefined || definition === undefined ? null : { term, definition }
}

export function readOnce(tree: FileTree): FileTree {
  const listed = new Map<string, readonly string[]>()
  const opened = new Map<string, string | null>()
  return {
    ...tree,
    paths: (glob) => {
      const key = typeof glob === "string" ? glob : glob.join("\n")
      const held = listed.get(key)
      if (held !== undefined) return held
      const found = tree.paths(glob)
      listed.set(key, found)
      return found
    },
    open: (relPath) => {
      if (opened.has(relPath)) return opened.get(relPath) ?? null
      const text = tree.open(relPath)
      opened.set(relPath, text)
      return text
    },
  }
}

export function slugKeys(repo: Repo, roots: Roots): ReadonlySet<string> {
  const tree = readOnce(diskFileTree(roots))
  const named = new Set<string>()
  for (const type of registryOf(tree)) {
    if (!reposOf(type).includes(repo)) continue
    const { properties } = compiledPageTypeFor(type, tree)
    for (const one of properties ?? []) {
      if (SLUG_TYPE.test(one.type)) named.add(one.name)
    }
  }
  named.add(SLUG_WORD)
  return named
}

export function reslugged(moves: Moves, roots: Roots): Reslugged {
  const carried = new Map<string, string>()
  for (const [from, to] of moves) {
    const slug = declaredBy(from, roots)
    if (slug === null || slug === fileStemOf(to)) continue
    carried.set(slug, fileStemOf(to))
  }
  return carried
}

function declaredBy(from: string, roots: Roots): string | null {
  if (isDirty(from) || !from.endsWith(".md")) return null
  return textField(
    parseFrontmatter(readFileSync(`${targetRoot(roots)}/${from}`, "utf8")),
    SLUG_WORD
  )
}

function becomes(was: string, carried: Reslugged): string | null {
  const whole = carried.get(was)
  if (whole !== undefined) return whole
  const parts = addressParts(was)
  if (parts === null) return null
  const half = carried.get(parts.slug)
  return half === undefined ? null : addressOf(parts.type, half)
}

export function slugPatches(
  body: string,
  carried: Reslugged,
  keys: ReadonlySet<string>,
  ownStem: string | null
): readonly Patch[] {
  if (carried.size === 0) return []
  const source = Source(body)
  const patches: Patch[] = []
  const follow = (value: FrontmatterValue, own: boolean): void => {
    if (value.kind === "list") {
      for (const item of value.items) follow(item, own)
      return
    }
    if (value.kind !== "scalar") return
    const was = value.value.text
    const { start, end } = value.value.span
    if (body.slice(start.offset, end.offset) !== was) return
    const text = own ? ownStem : becomes(was, carried)
    if (text === null || text === was) return
    patches.push({ start: start.offset, end: end.offset, text, was })
  }
  for (const key of readBlock(source).keys) {
    if (keys.has(key.name)) follow(key.value, key.name === SLUG_WORD)
  }
  return patches
}

export function slugEdges(moves: Moves, roots: Roots): Outcome {
  const notices: string[] = []
  for (const [from, to] of moves) {
    const slug = declaredBy(from, roots)
    if (slug === null || slug === fileStemOf(to)) continue
    const term = definitionOf(readFileSync(`${targetRoot(roots)}/${from}`, "utf8"))?.term ?? null
    notices.push(
      `\`${to}\` carries \`${SLUG_WORD}: ${slug}\` → \`${fileStemOf(to)}\`, and every frontmatter value and ` +
        `link label naming it followed — each rewrite is printed above with the line it sits on.` +
        (term === null
          ? ""
          : ` Its \`# Definition\` still reads **${term}**, which nothing here rewrites: a term is authored ` +
            `prose that the sentence under it is written around, so a name substituted into one lands a ` +
            `statement that is false rather than merely stale. Change the term and that sentence together, ` +
            `or leave both — either is an edit, and neither is this move's to guess at.`)
    )
  }
  if (notices.length === 0) {
    return skip("slug", "nothing being moved declares a domain whose name this rename changes")
  }
  return advise(
    "slug",
    `${notices.length} moved document(s) change the domain they declare`,
    notices
  )
}
