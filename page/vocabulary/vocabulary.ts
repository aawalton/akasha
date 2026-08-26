import { readFileSync } from "node:fs"
import { onceInCall } from "../../cache/during-call.ts"
import { canonicalize } from "../../repo/path/path.ts"
import { isAttachmentFile } from "../attachment-file.ts"
import { listField, parseFrontmatter, textField } from "../frontmatter.ts"
import { definitionOf } from "../definition/definition.ts"
import { requiredReadingManifestOf, sequenceManifestOf } from "../manifest/manifest.ts"
import { withoutFences } from "../markdown/markdown.ts"
import { isRowsFile } from "../rows-file.ts"

const SLUG_KEY = "slug"

const PARENTS_KEY = "domain-parent-slug"

const PAGE_TYPE_KEY = "page-type-slug"

const BARRED = "barred-meaning"

const COINED = "coined"

const BETWEEN = /[^\p{L}\p{N}-]+/u

const SKIPPED = new Set([".git", "node_modules"])

export interface Word {
  readonly slug: string
  readonly term: string
  readonly relPath: string
}

export interface Vocabulary {
  readonly words: ReadonlyMap<string, Word>
  readonly carries: ReadonlyMap<string, readonly string[]>
  readonly children: ReadonlyMap<string, readonly string[]>
  readonly parents: ReadonlyMap<string, readonly string[]>
  readonly retired: ReadonlySet<string>
  readonly coined: ReadonlySet<string>
  readonly slugAt: ReadonlyMap<string, string>
}

export function documentsIn(root: string): readonly string[] {
  return onceInCall(`documents:${root}`, () => {
    const paths: string[] = []
    for (const relPath of new Bun.Glob("**/*.md").scanSync({ cwd: root, dot: true })) {
      if (SKIPPED.has(relPath.split("/")[0] as string)) continue
      if (isAttachmentFile(relPath) || isRowsFile(relPath)) continue
      paths.push(relPath)
    }
    return paths.sort()
  })
}

export function proseOf(body: string): string {
  return withoutFences(body)
    .split("\n")
    .filter((line) => !line.startsWith("#"))
    .join("\n")
}

export function tokensOf(text: string): ReadonlySet<string> {
  return new Set(text.toLowerCase().split(BETWEEN).filter((one) => one !== ""))
}

export function partsOf(term: string): readonly string[] {
  return term.toLowerCase().split(BETWEEN).filter((one) => one !== "")
}

export function present(tokens: ReadonlySet<string>, term: string): boolean {
  const parts = partsOf(term)
  return parts.length === 1 && tokens.has(parts[0] as string)
}

export function ownClosureOf(body: string, vocabulary: Vocabulary): ReadonlySet<string> {
  const own = textField(parseFrontmatter(body), SLUG_KEY)
  const out = new Set<string>()
  let reaching = own === null ? [] : [own]
  while (reaching.length > 0) {
    const next: string[] = []
    for (const slug of reaching) {
      if (out.has(slug)) continue
      out.add(slug)
      next.push(...(vocabulary.parents.get(slug) ?? []))
    }
    reaching = next
  }
  return out
}

export function vocabularyOf(root: string): Vocabulary {
  return onceInCall(`vocabulary:${root}`, () => readVocabulary(root))
}

function readVocabulary(root: string): Vocabulary {
  const words = new Map<string, Word>()
  const carries = new Map<string, readonly string[]>()
  const children = new Map<string, string[]>()
  const parents = new Map<string, readonly string[]>()
  const retired = new Set<string>()
  const coined = new Set<string>()
  const slugAt = new Map<string, string>()
  for (const relPath of documentsIn(root)) {
    let body: string
    try {
      body = readFileSync(`${root}/${relPath}`, "utf8")
    } catch {
      continue
    }
    const frontmatter = parseFrontmatter(body)
    const slug = textField(frontmatter, SLUG_KEY)
    if (slug === null) continue
    slugAt.set(relPath, slug)
    if (textField(frontmatter, PAGE_TYPE_KEY) === BARRED) retired.add(slug)
    if (textField(frontmatter, COINED) === "true") coined.add(slug)
    const stated = definitionOf(body)
    if (stated !== null) words.set(slug, { slug, term: stated.term, relPath })
    carries.set(slug, [...requiredReadingManifestOf(body).slugs, ...sequenceManifestOf(body).slugs])
    parents.set(slug, listField(frontmatter, PARENTS_KEY))
    for (const parent of listField(frontmatter, PARENTS_KEY)) {
      const kin = children.get(parent)
      if (kin === undefined) children.set(parent, [slug])
      else kin.push(slug)
    }
  }
  return { words, carries, children, parents, retired, coined, slugAt }
}

export function loadedFrom(
  paths: Iterable<string>,
  root: string,
  vocabulary: Vocabulary
): ReadonlySet<string> {
  const loaded = new Set<string>()
  const within = `${canonicalize(root)}/`
  for (const absolute of paths) {
    const real = canonicalize(absolute)
    if (!real.startsWith(within)) continue
    const slug = vocabulary.slugAt.get(real.slice(within.length))
    if (slug !== undefined) loaded.add(slug)
  }
  return loaded
}

export function frontierOf(
  from: Iterable<string>,
  loaded: ReadonlySet<string>,
  vocabulary: Vocabulary
): ReadonlySet<string> {
  const out = new Set<string>()
  for (const slug of from) {
    for (const named of [
      ...(vocabulary.carries.get(slug) ?? []),
      ...(vocabulary.children.get(slug) ?? []),
    ]) {
      if (loaded.has(named) || !vocabulary.words.has(named)) continue
      out.add(named)
    }
  }
  return out
}

export function unreadWordsIn(
  text: string,
  loaded: ReadonlySet<string>,
  vocabulary: Vocabulary
): readonly Word[] {
  const own = ownClosureOf(text, vocabulary)
  const tokens = tokensOf(proseOf(text))
  const found = new Map<string, Word>()
  const seen = new Set<string>(loaded)
  const used = (slug: string): Word | null => {
    const word = vocabulary.words.get(slug)
    if (word === undefined || own.has(slug) || !present(tokens, word.term)) return null
    return word
  }
  for (const slug of vocabulary.retired) {
    if (seen.has(slug)) continue
    seen.add(slug)
    const word = used(slug)
    if (word !== null && vocabulary.coined.has(slug)) found.set(slug, word)
  }
  let reaching: Iterable<string> = loaded
  while (true) {
    const next: string[] = []
    for (const slug of frontierOf(reaching, loaded, vocabulary)) {
      if (seen.has(slug)) continue
      seen.add(slug)
      const word = used(slug)
      if (word === null) continue
      if (vocabulary.coined.has(slug)) found.set(slug, word)
      next.push(slug)
    }
    if (next.length === 0) break
    reaching = next
  }
  return [...found.values()].sort((one, two) => one.term.localeCompare(two.term))
}
