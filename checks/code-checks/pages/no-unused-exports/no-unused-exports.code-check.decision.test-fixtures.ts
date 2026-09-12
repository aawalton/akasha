import { founded, put } from "akasha/checks/modules/scratch/check-scratch.module.code.ts"
import {
  importFiled,
  noImportersFiled,
} from "akasha/pages/indexes/reading/index-reading.module.test-fixtures.ts"
import { bytesOf } from "akasha/testing-system/bodying/bodying.module.code.ts"
import { scratchWorld } from "akasha/utils/fs/scratching/scratching.module.code.ts"

export const AT = "akasha/held.module.code.ts"

export const READER = "akasha/reader.module.code.ts"

export const HELD_TEXT = "export const held = 1\nexport const spare = 2\n"

export const scratch = scratchWorld()

export function rooted(): string {
  const root = scratch.rootFor("akasha-unused-exports-")
  founded(root)
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
