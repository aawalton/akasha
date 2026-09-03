import { realpathSync } from "node:fs"
import type { Answer } from "@akasha/command-system/calling"
import { refused } from "@akasha/command-system/calling"
import { codeRoot } from "@akasha/pages-system/code-root"

const DATA = 2

const FAILED = 3

const CODE_ROOT_FLAG = "--code-root"

const CODE_ROOT_ENV = "CODE_ROOT"

const GENERATORS = "@akasha/temper-addon-data/generate-addon-data"

function valuesOf(argv: readonly string[], flag: string): readonly string[] {
  const found: string[] = []
  for (let at = 0; at < argv.length; at += 1) {
    const value = argv[at + 1]
    if (argv[at] === flag && value !== undefined) found.push(value)
  }
  return found
}

function messageOf(thrown: unknown): string {
  return thrown instanceof Error ? thrown.message : String(thrown)
}

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
