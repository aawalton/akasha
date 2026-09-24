import { realpathSync } from "node:fs"
import { readFile } from "node:fs/promises"
import { join } from "node:path"
import { changeMechanical } from "akasha/change/mechanical/change-mechanical.page-type.ts"
import { addFileOfAnyKind } from "akasha/change/mechanical/file/add/add-file-of-any-kind/add-file-of-any-kind.change-mechanical.ts"
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
import { temperEsoGenerateColors as page } from "akasha/command/pages/temper/eso/generate/colors/temper-eso-generate-colors.command.ts"
import { codeRoot } from "akasha/page/modules/code-root/code-root.module.code.ts"
import { resolveSavedVariablesPath } from "akasha/temper/catalog/side-file/modules/catalog-file-paths/catalog-file-paths.module.code.ts"
import {
  colorsBody,
  engineColorsIn,
} from "akasha/temper/eso/color/modules/engine-colors-reading/engine-colors-reading.module.code.ts"
import { COLORS_AT } from "akasha/temper/eso/color/modules/engine-colors-seeding/engine-colors-seeding.module.code.ts"

const NAMED = [codeRootArgument, savedVariablesFileArgument] as const

const PUT = `${changeMechanical.slug}/${addFileOfAnyKind.slug}` as const

const MESSAGE = "Write the engine's interface colors from the game's capture"

type Taken = Taking<typeof page, typeof NAMED>

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

  const held = engineColorsIn(capture)
  const types = held === undefined ? [] : Object.values(held.colors)
  if (held === undefined || types.length === 0) {
    return refused(
      `\`${from}\` carries no interface colors, so the table was left as it is` +
        " — the game collects them when it next reloads",
      DATA
    )
  }

  const body = colorsBody(held)
  let was: string | null = null
  try {
    was = await readFile(join(root, COLORS_AT), "utf8")
  } catch {
    was = null
  }
  if (was === body) {
    return told([
      `\`${COLORS_AT}\` already holds what the capture says, so nothing landed`,
      `read from ${from} at API version ${String(held.apiVersion)}`,
    ])
  }

  const asked: readonly Asking[] = [{ at: PUT, given: { at: COLORS_AT, body } }]
  const landed = await runMechanicalChange(root, asked, MESSAGE, { writer: given.calledAs })
  if ("refusals" in landed) {
    return refused(`the colors were not landed — ${landed.refusals.join("; ")}`, OPERATIONAL)
  }
  if (landed.landed.length === 0) {
    return refused(
      `\`${COLORS_AT}\` differs from the capture and nothing landed — ${landed.said.join("; ")}`,
      OPERATIONAL
    )
  }

  const colors = types.reduce((all, fields) => all + Object.keys(fields).length, 0)
  return told([
    `${String(colors)} color(s) over ${String(types.length)} type(s) landed in \`${COLORS_AT}\``,
    `read from ${from} at API version ${String(held.apiVersion)}`,
  ])
}

export function temperEsoGenerateColors(argv: readonly string[], given: Given): Promise<Answer> {
  return answeredByPage(argv, given.calledAs, page, NAMED, (taken) => written(taken, given))
}
