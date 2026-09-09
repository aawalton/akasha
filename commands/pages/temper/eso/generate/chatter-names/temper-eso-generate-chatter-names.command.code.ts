import { realpathSync } from "node:fs"
import { readFile } from "node:fs/promises"
import { resolve } from "node:path"
import { runMechanicalChange } from "@akasha/changes/mechanical-change-running"
import { codeRoot } from "@akasha/pages/code-root"
import { chatterNamesModule } from "../../../../../../temper/temper-commands/eso-chatter-names/eso-chatter-names.module.code.ts"
import {
  saidFor,
  saidShort,
} from "../../../../../../temper/temper-commands/flag-fault-stage/flag-fault-stage.module.code.ts"
import type { Answer } from "../../../../../modules/calling/calling.module.code.ts"
import { answering, refused } from "../../../../../modules/calling/calling.module.code.ts"

const DATA = 2

const FAILED = 3

const SELF = "akasha temper-eso-generate-chatter-names"

const CODE_ROOT_FLAG = "--code-root"

const SOURCE_REL = "temper/addons/types/eso/generated/enums.d.ts"

const OUT_REL = "temper/player-quests-addon/src/generated/chatter-names.generated.ts"

const PUT = "change-mechanical/add-file-code"

const MESSAGE = "the chatter and interaction name registry, read out of the emitted declarations"

export async function temperEsoGenerateChatterNames(argv: readonly string[] = []): Promise<Answer> {
  const named = saidFor(argv, CODE_ROOT_FLAG)

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
        "`akasha temper-eso-generate-typings` is what writes it — " +
        saidShort(thrown),
      DATA
    )
  }

  const registry = chatterNamesModule(source, SELF)
  if (registry.chatter.length === 0 || registry.interaction.length === 0) {
    return refused(
      `${sourcePath} declares ${String(registry.chatter.length)} CHATTER_ and ` +
        `${String(registry.interaction.length)} INTERACTION_ constant(s). An empty registry reads to ` +
        "the trace as a clean answer, so nothing was written.",
      DATA
    )
  }

  const outPath = resolve(root, OUT_REL)
  let held: string | null = null
  try {
    held = await readFile(outPath, "utf8")
  } catch {}

  const many =
    `${String(registry.chatter.length)} CHATTER_ and ` +
    `${String(registry.interaction.length)} INTERACTION_ name(s)`
  if (held === registry.text) {
    return answering([`${outPath} already holds ${many}`, `read from ${sourcePath}`], [], 0)
  }

  const landed = await runMechanicalChange(
    root,
    [{ at: PUT, given: { at: OUT_REL, body: registry.text } }],
    MESSAGE
  )
  if ("refusals" in landed) {
    return refused(
      `the registry was not landed into ${outPath} — ${landed.refusals.join("; ")}`,
      FAILED
    )
  }

  return answering([`wrote ${many} into ${outPath}`, `read from ${sourcePath}`], [], 0)
}
