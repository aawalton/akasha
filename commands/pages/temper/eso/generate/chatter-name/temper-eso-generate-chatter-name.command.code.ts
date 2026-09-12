import { realpathSync } from "node:fs"
import { readFile } from "node:fs/promises"
import { resolve } from "node:path"
import { runMechanicalChange } from "akasha/changes/runners/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { codeRoot as codeRootArgument } from "akasha/commands/arguments/pages/code-root.argument.ts"
import {
  DATA,
  keeping,
  OPERATIONAL,
  refused,
  told,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import {
  answeredByPage,
  type Generating,
  type Taking,
} from "akasha/commands/modules/page-answering/page-answering.module.code.ts"
import { temperEsoGenerateChatterName as page } from "akasha/commands/pages/temper/eso/generate/chatter-name/temper-eso-generate-chatter-name.command.ts"
import { fileOf } from "akasha/pages/indexes/property-file/property-file.module.code.ts"
import { valuedAt } from "akasha/pages/indexes/reading/index-reading.module.code.ts"
import { codeRoot } from "akasha/pages/modules/code-root/code-root.module.code.ts"
import { chatterNamesModule } from "akasha/temper/commands/eso-chatter-names/eso-chatter-names.module.code.ts"
import { saidShort } from "akasha/temper/commands/flag-fault-stage/flag-fault-stage.module.code.ts"

const NAMED = [codeRootArgument]

const SOURCE_REL = "temper/addons/types/eso/generated/enums.d.ts"

const MODULE = "module"

const TABLES = "quests-chatter-name-tables"

const CODE = "code"

const PUT = "change-mechanical/add-file-code"

const MESSAGE = "the chatter and interaction name registry, read out of the emitted declarations"

type Taken = Taking<typeof page, typeof NAMED>

async function generated(done: string[], taken: Taken): Promise<Answer> {
  const named = taken.codeRoot
  let root: string
  try {
    root = realpathSync(named ?? codeRoot())
  } catch (thrown) {
    return refused(
      `${named ?? codeRoot()} is no checkout on this disk, so nothing was read or written — ${saidShort(thrown)}`,
      DATA
    )
  }

  const sourcePath = resolve(root, SOURCE_REL)
  let source: string
  try {
    source = await readFile(sourcePath, "utf8")
  } catch (thrown) {
    return refused(
      `${sourcePath} is what this registry is drawn from and it is not there — ` +
        "`akasha temper eso generate declaration` is what writes it — " +
        saidShort(thrown),
      DATA
    )
  }

  const registry = chatterNamesModule(source)
  if (registry.chatter.length === 0 || registry.interaction.length === 0) {
    return refused(
      `${sourcePath} declares ${String(registry.chatter.length)} CHATTER_ and ` +
        `${String(registry.interaction.length)} INTERACTION_ constant(s). An empty registry reads to ` +
        "the trace as a clean answer, so nothing was written.",
      DATA
    )
  }

  let outRel: string
  try {
    outRel = fileOf(root, valuedAt(root, MODULE, TABLES), MODULE, CODE)
  } catch (thrown) {
    return refused(
      `the index under ${root} names no \`${MODULE}/${TABLES}\` page for the registry to land in — ` +
        saidShort(thrown),
      DATA
    )
  }

  const outPath = resolve(root, outRel)
  let held: string | null = null
  try {
    held = await readFile(outPath, "utf8")
  } catch {}

  const many =
    `${String(registry.chatter.length)} CHATTER_ and ` +
    `${String(registry.interaction.length)} INTERACTION_ name(s)`
  if (held === registry.text) {
    return told([`${outPath} already holds ${many}`, `read from ${sourcePath}`])
  }

  const landed = await runMechanicalChange(
    root,
    [{ at: PUT, given: { at: outRel, body: registry.text } }],
    MESSAGE,
    null,
    { done }
  )
  if ("refusals" in landed) {
    const why = `the registry was not landed into ${outPath} — ${landed.refusals.join("; ")}`
    return keeping(done, refused(why, OPERATIONAL))
  }

  return told([`wrote ${many} into ${outPath}`, `read from ${sourcePath}`])
}

export async function chattering(
  argv: readonly string[],
  given: Given,
  generating: Generating<Taken> = generated
): Promise<Answer> {
  return await answeredByPage(argv, given.calledAs, page, NAMED, (taken, done) =>
    generating(done, taken, given)
  )
}

export function temperEsoGenerateChatterName(
  argv: readonly string[],
  given: Given
): Promise<Answer> {
  return chattering(argv, given)
}
