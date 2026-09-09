import { realpathSync } from "node:fs"
import { codeRoot } from "@akasha/pages/code-root"
import { valuesOf } from "../../../../../temper/temper-commands/argument-word-reading/argument-word-reading.module.code.ts"
import type { Answer } from "../../../../modules/calling/calling.module.code.ts"
import { refused } from "../../../../modules/calling/calling.module.code.ts"
import { saidBy as messageOf } from "../../../../modules/fault-saying/fault-saying.module.code.ts"

const DATA = 2

const FAILED = 3

const CODE_ROOT_FLAG = "--code-root"

const CODE_ROOT_ENV = "CODE_ROOT"

const GENERATORS = "@akasha/temper-addon-data/generate-addon-data"

export async function temperAddonDataGenerate(argv: readonly string[] = []): Promise<Answer> {
  const named = valuesOf(argv, CODE_ROOT_FLAG)[0]

  let root: string
  try {
    root = realpathSync(named ?? codeRoot())
  } catch (thrown) {
    return refused(
      `${named ?? codeRoot()} is no checkout on this disk, so nothing was read or written: ${messageOf(thrown)}`,
      DATA
    )
  }

  process.env[CODE_ROOT_ENV] = root

  const { generateAddonData, EquipmentMappingsStale } = await import(GENERATORS)
  try {
    await generateAddonData()
  } catch (thrown) {
    if (thrown instanceof EquipmentMappingsStale) {
      return refused(
        `the emitted data no longer matches the hand-written equipment mappings: ${messageOf(thrown)}`,
        DATA
      )
    }
    return refused(`the addon data was not written whole: ${messageOf(thrown)}`, FAILED)
  }

  return {
    report: [`wrote the addon data files under ${root} from the pages holding their source`],
    refusals: [],
    code: 0,
  }
}
