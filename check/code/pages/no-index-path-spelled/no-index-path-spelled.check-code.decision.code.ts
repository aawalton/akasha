import { dirname } from "node:path"
import type { Paged } from "akasha/check/modules/audit-commit/audit-commit.module.code.ts"
import { spelledIn } from "akasha/code/reading/modules/code-specifier/code-specifier.module.code.ts"
import { indexNamed } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { pageNamed } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { shortened } from "akasha/text/writing/modules/shortened/shortened.module.code.ts"

const PAGE_TYPE = "page-type"

const INDEX = "index"

const AT = indexNamed()

const NAMED = /[A-Za-z0-9._-]$/

const PARTED_BY = "/"

function pathInto(text: string): boolean {
  for (let at = text.indexOf(AT); at !== -1; at = text.indexOf(AT, at + 1)) {
    if (NAMED.test(text.slice(0, at))) continue
    const after = text[at + AT.length]
    if (after !== undefined && after !== PARTED_BY) continue
    return true
  }
  return false
}

const SAID = "where the index sits is said by `index-reading`, and asked of it rather than spelt"

export function found(
  under: string,
  pageTypes: ReadonlySet<string>,
  path: string,
  text: string
): readonly string[] {
  if (path.startsWith(under)) return []
  if (pageNamed(path, pageTypes)) return []
  const said: string[] = []
  for (const one of spelledIn(path, text)) {
    if (!pathInto(one.text)) continue
    said.push(`\`${shortened(one.text)}\` spells a path into the index — ${SAID}`)
  }
  return said
}

const INDEXES = new WeakMap<Paged, string>()

export function indexAt(paged: Paged): string {
  const held = INDEXES.get(paged)
  if (held !== undefined) return held
  const one = paged.index.listedAt(PAGE_TYPE, INDEX)[0]
  if (one === undefined) {
    throw new Error(`the index files no \`${PAGE_TYPE}/${INDEX}\`, so where it sits is unknown`)
  }
  const made = `${dirname(one.path)}/`
  INDEXES.set(paged, made)
  return made
}
