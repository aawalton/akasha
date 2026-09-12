import { realpathSync } from "node:fs"
import { takenFor } from "akasha/commands/arguments/modules/argument-taking/argument-taking.module.code.ts"
import { codeRoot as codeRootArgument } from "akasha/commands/arguments/pages/code-root.argument.ts"
import {
  answering,
  DATA,
  keeping,
  refused,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { mistaking } from "akasha/commands/modules/refusing/refusing.module.code.ts"
import { temperAddonDataGenerate as page } from "akasha/commands/pages/temper/addon/data-generate/temper-addon-data-generate.command.ts"
import { codeRoot } from "akasha/pages/code-root/code-root.module.code.ts"
import {
  EquipmentMappingsStale,
  generateAddonData,
} from "akasha/temper/addon-data/generate-addon-data/generate-addon-data.module.code.ts"
import { saidBy as messageOf } from "akasha/utils/narrow/said-by/said-by.module.code.ts"

const NAMED = [codeRootArgument]

const CODE_ROOT_ENV = "CODE_ROOT"

const STALE = "the emitted data no longer matches the hand-written equipment mappings"

export type Generating = (done: string[], root: string) => Promise<Answer>

async function generated(done: string[], root: string): Promise<Answer> {
  try {
    await generateAddonData(done)
  } catch (thrown) {
    if (!(thrown instanceof EquipmentMappingsStale)) throw thrown
    return keeping(done, refused(`${STALE}: ${messageOf(thrown)}`, DATA))
  }
  return told([`wrote the addon data files under ${root} from the pages holding their source`])
}

export async function generatedBy(
  root: string,
  generating: Generating = generated
): Promise<Answer> {
  return await answering(async (done) => await generating(done, root))
}

export async function temperAddonDataGenerate(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  const read = takenFor(argv, given.calledAs, page, NAMED)
  if ("refused" in read) return mistaking(read.refused)
  const named = read.taken.codeRoot

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

  return await generatedBy(root)
}
