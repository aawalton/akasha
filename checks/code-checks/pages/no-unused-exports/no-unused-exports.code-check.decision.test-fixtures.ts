import {
  founded,
  pathFor,
  put,
  typed,
} from "akasha/checks/modules/scratch/check-scratch.module.code.ts"
import {
  importFiled,
  noImportersFiled,
} from "akasha/pages/indexes/reading/index-reading.module.test-fixtures.ts"
import { bytesOf } from "akasha/testing-system/bodying/bodying.module.code.ts"
import { scratchWorld } from "akasha/utils/fs/scratching/scratching.module.code.ts"

export const AT = "akasha/held.module.code.ts"

export const READER = "akasha/reader.module.code.ts"

export const HELD_TEXT = "export const held = 1\nexport const spare = 2\n"

export const PAGE_AT = pathFor("domain", "held")

export const PAGE_TEXT =
  'export const held = { id: "01a0927a-1000-7001-8000-000000000001",' +
  ' pageTypeSlug: "domain", slug: "held" }\nexport const spare = 2\n'

export const scratch = scratchWorld()

export function rooted(): string {
  const root = scratch.rootFor("akasha-unused-exports-")
  founded(root)
  typed(root, "domain", "page")
  noImportersFiled(root)
  return root
}

export function importedBy(root: string, paths: readonly string[]): undefined {
  importFiled(
    root,
    AT,
    paths.map((path) => ({ path }))
  )
}

export const SPELLED = `akasha/${AT}`

export const EVERY_TEXT = `import * as held from "${SPELLED}"\n\nexport const reader = held\n`

export function readerText(taken: string): string {
  return `import { ${taken} } from "${SPELLED}"\n\nexport const reader = 1\n`
}

export function reading(root: string, text: string): undefined {
  put(root, READER, bytesOf(text))
}
