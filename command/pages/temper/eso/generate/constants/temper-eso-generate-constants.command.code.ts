import { realpathSync } from "node:fs"
import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { addFile } from "akasha/change/mechanical/file/add/add-file/add-file.change-mechanical-file.ts"
import { changeMechanicalFile } from "akasha/change/mechanical/file/change-mechanical-file.page-type.ts"
import {
  type Asking,
  runMechanicalChange,
} from "akasha/change/runner/pages/mechanical-change-running/mechanical-change-running.change-runner.code.ts"
import { codeRoot as codeRootArgument } from "akasha/command/argument/pages/code-root.argument.ts"
import { savedVariablesFile as savedVariablesFileArgument } from "akasha/command/argument/pages/saved-variables-file.argument.ts"
import {
  DATA,
  OPERATIONAL,
  refused,
  told,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer, Given } from "akasha/command/modules/calling/calling.module.code.ts"
import {
  answeredByPage,
  type Taking,
} from "akasha/command/modules/page-answering/page-answering.module.code.ts"
import { temperEsoGenerateConstants as page } from "akasha/command/pages/temper/eso/generate/constants/temper-eso-generate-constants.command.ts"
import { codeRoot } from "akasha/page/modules/code-root/code-root.module.code.ts"
import { resolveSavedVariablesPath } from "akasha/temper/catalog/side-file/modules/catalog-file-paths/catalog-file-paths.module.code.ts"
import {
  constantsBody,
  engineConstantsIn,
} from "akasha/temper/eso/constant/modules/engine-constants-reading/engine-constants-reading.module.code.ts"

const NAMED = [codeRootArgument, savedVariablesFileArgument] as const

const PUT = `${changeMechanicalFile.slug}/${addFile.slug}` as const

const AT = "temper/eso/constant/modules/engine-constants/engine-constants.data-table.data.json"

const MESSAGE = "Write the engine's constants from the game's capture"

type Taken = Taking<typeof page, typeof NAMED>

function countOf(held: Readonly<Record<string, unknown>>): string {
  return String(Object.keys(held).length)
}

async function written(taken: Taken, given: Given): Promise<Answer> {
  const named = taken.codeRoot ?? codeRoot()
  let root: string
  try {
    root = realpathSync(named)
  } catch {
    return refused(`\`${named}\` is no checkout on this disk, so nothing was read or written`, DATA)
  }

  const from = resolveSavedVariablesPath(taken.savedVariablesFile)
  let capture: string
  try {
    capture = await readFile(from, "utf8")
  } catch {
    return refused(`\`${from}\` is no file this can read, so there is no capture to write`, DATA)
  }

  const held = engineConstantsIn(capture)
  if (held === undefined) {
    return refused(
      `\`${from}\` carries no engine constants, so the table was left as it is` +
        " — the game collects them when it next reloads",
      DATA
    )
  }

  const body = constantsBody(held)
  let was: string | null = null
  try {
    was = await readFile(join(root, AT), "utf8")
  } catch {
    was = null
  }
  if (was === body) {
    return told([
      `\`${AT}\` already holds what the capture says, so nothing landed`,
      `read from ${from} at API version ${String(held.apiVersion)}`,
    ])
  }

  const asked: readonly Asking[] = [{ at: PUT, given: { at: AT, body } }]
  const landed = await runMechanicalChange(root, asked, MESSAGE, { writer: given.calledAs })
  if ("refusals" in landed) {
    return refused(`the constants were not landed — ${landed.refusals.join("; ")}`, OPERATIONAL)
  }

  return told([
    `${countOf(held.numbers)} number(s) and ${countOf(held.words)} word(s) landed in \`${AT}\``,
    `${String(held.named.length)} constant(s) hold a word and ` +
      `${String(held.unwritable.length)} hold a number the saved file could not carry`,
    `read from ${from} at API version ${String(held.apiVersion)}, listed by ${held.listedBy}`,
  ])
}

export function temperEsoGenerateConstants(argv: readonly string[], given: Given): Promise<Answer> {
  return answeredByPage(argv, given.calledAs, page, NAMED, (taken) => written(taken, given))
}
