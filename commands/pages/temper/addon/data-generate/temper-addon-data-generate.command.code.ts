import { realpathSync } from "node:fs"
import {
  DATA,
  OK,
  OPERATIONAL,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer } from "akasha/commands/modules/calling/calling.module.code.ts"
import { refused } from "akasha/commands/modules/calling/calling.module.code.ts"
import { codeRoot } from "akasha/pages/code-root/code-root.module.code.ts"
import {
  EquipmentMappingsStale,
  generateAddonData,
} from "akasha/temper/addon-data/generate-addon-data/generate-addon-data.module.code.ts"
import { valuesOf } from "akasha/temper/commands/argument-word-reading/argument-word-reading.module.code.ts"
import { saidBy as messageOf } from "akasha/utils/narrow/said-by/said-by.module.code.ts"

const CODE_ROOT_FLAG = "--code-root"

const CODE_ROOT_ENV = "CODE_ROOT"

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

  try {
    await generateAddonData()
  } catch (thrown) {
    if (thrown instanceof EquipmentMappingsStale) {
      return refused(
        `the emitted data no longer matches the hand-written equipment mappings: ${messageOf(thrown)}`,
        DATA
      )
    }
    return refused(`the addon data was not written whole: ${messageOf(thrown)}`, OPERATIONAL)
  }

  return {
    report: [`wrote the addon data files under ${root} from the pages holding their source`],
    refusals: [],
    code: OK,
  }
}
