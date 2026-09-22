import { realpathSync } from "node:fs"
import { readFile } from "node:fs/promises"
import { resolve } from "node:path"
import { changeMechanical } from "akasha/change/mechanical/change-mechanical.page-type.ts"
import { addFileCode } from "akasha/change/mechanical/file/add/add-file-code/add-file-code.change-mechanical.ts"
import { runMechanicalChange } from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { codeRoot as codeRootArgument } from "akasha/command/argument/pages/code-root.argument.ts"
import {
  DATA,
  keeping,
  OPERATIONAL,
  refused,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import {
  answeredByPage,
  type Generating,
  type Taking,
} from "akasha/command/modules/page-answering/page-answering.module.code.ts"
import { temperEsoGenerateChatterName as page } from "akasha/command/pages/temper/eso/generate/chatter-name/temper-eso-generate-chatter-name.command.ts"
import { fileOf } from "akasha/page/index/modules/property-file/property-file.module.code.ts"
import { valuedAt } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { codeRoot } from "akasha/page/modules/code-root/code-root.module.code.ts"
import { chatterNamesModule } from "akasha/temper/command/modules/eso-chatter-names/eso-chatter-names.module.code.ts"
import { saidShort } from "akasha/temper/command/modules/flag-fault-stage/flag-fault-stage.module.code.ts"
import { pagesWrittenBy } from "akasha/temper/eso/declaration/modules/eso-declaration-pages/eso-declaration-pages.module.code.ts"

const NAMED = [codeRootArgument]

const WRITER = "akasha temper eso generate declaration"

const MODULE = "module"

const TABLES = "quests-chatter-name-tables"

const CODE = "code"

const PUT = `${changeMechanical.slug}/${addFileCode.slug}` as const

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

  let declared: ReturnType<typeof pagesWrittenBy>
  try {
    declared = pagesWrittenBy(root, WRITER)
  } catch (thrown) {
    return refused(
      `the index under ${root} would not say which declarations \`${WRITER}\` writes, so there was ` +
        `nothing to read the registry out of — ${saidShort(thrown)}`,
      DATA
    )
  }

  if (declared.length === 0) {
    return refused(
      `no page under ${root} states \`${WRITER}\` wrote it, and those are the declarations this ` +
        "registry is drawn from, so nothing was written.",
      DATA
    )
  }

  const short = declared.find((one) => one.body === "")
  if (short !== undefined) {
    return refused(
      `${resolve(root, short.beside)} is the declaration the \`${short.slug}\` page carries and it ` +
        "is not there, so the registry would be drawn from less than the pages state.",
      DATA
    )
  }

  const drawn = `${String(declared.length)} declaration(s) \`${WRITER}\` writes`

  const registry = chatterNamesModule(declared.map((one) => one.body).join("\n"))
  if (registry.chatter.length === 0 || registry.interaction.length === 0) {
    return refused(
      `${drawn} declare ${String(registry.chatter.length)} CHATTER_ and ` +
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
    return told([`${outPath} already holds ${many}`, `read from ${drawn} under ${root}`])
  }

  const landed = await runMechanicalChange(
    root,
    [{ at: PUT, given: { at: outRel, body: registry.text } }],
    MESSAGE,
    { done }
  )
  if ("refusals" in landed) {
    const why = `the registry was not landed into ${outPath} — ${landed.refusals.join("; ")}`
    return keeping(done, refused(why, OPERATIONAL))
  }

  return told([`wrote ${many} into ${outPath}`, `read from ${drawn} under ${root}`])
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
