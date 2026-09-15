import { dirname } from "node:path"
import { spelledIn } from "akasha/code/reading/modules/code-specifier/code-specifier.module.code.ts"
import { indexNamed } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { pageNamed } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import type { Shadow } from "akasha/page/modules/shadow/shadow.module.code.ts"
import { shortened } from "akasha/util/text/modules/shortened/shortened.module.code.ts"

const PAGE_TYPE = "page-type"

const INDEX = "index"

const AT = indexNamed()

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
    if (!one.text.includes(AT)) continue
    said.push(`\`${shortened(one.text)}\` spells a path into the index — ${SAID}`)
  }
  return said
}

const INDEXES = new WeakMap<Shadow, string>()

export function indexAt(shadow: Shadow): string {
  const held = INDEXES.get(shadow)
  if (held !== undefined) return held
  const one = shadow.index.listedAt(PAGE_TYPE, INDEX)[0]
  if (one === undefined) {
    throw new Error(`the index files no \`${PAGE_TYPE}/${INDEX}\`, so where it sits is unknown`)
  }
  const made = `${dirname(one.path)}/`
  INDEXES.set(shadow, made)
  return made
}
