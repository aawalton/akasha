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
import { capturedCatalog } from "akasha/temper/catalog/world/temper-catalog-domain/modules/catalog-capture-reading/catalog-capture-reading.module.code.ts"
import {
  constantsBody,
  engineConstantsIn,
} from "akasha/temper/eso/constant/modules/engine-constants-reading/engine-constants-reading.module.code.ts"

const NAMED = [codeRootArgument] as const

const HELD = "engineGlobalsCatalog"

const PUT = `${changeMechanical.slug}/${addFileOfAnyKind.slug}` as const

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

  const catalog = capturedCatalog(root, HELD)
  if (catalog === undefined) {
    return refused(
      "the `engine-globals` catalog domain has no capture landed, so the table was left as it is" +
        " — the watcher lands one after the game next reloads",
      DATA
    )
  }

  const held = engineConstantsIn(catalog)

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
      `read from the engine-globals capture at API version ${String(held.apiVersion)}`,
    ])
  }

  const asked: readonly Asking[] = [{ at: PUT, given: { at: AT, body } }]
  const landed = await runMechanicalChange(root, asked, MESSAGE, { writer: given.calledAs })
  if ("refusals" in landed) {
    return refused(`the constants were not landed — ${landed.refusals.join("; ")}`, OPERATIONAL)
  }
  if (landed.landed.length === 0) {
    return refused(
      `\`${AT}\` differs from the capture and nothing landed — ${landed.said.join("; ")}`,
      OPERATIONAL
    )
  }

  return told([
    `${countOf(held.numbers)} number(s) and ${countOf(held.words)} word(s) landed in \`${AT}\``,
    `${String(held.named.length)} constant(s) hold a word and ` +
      `${String(held.unwritable.length)} hold a number the saved file could not carry`,
    `read from the engine-globals capture at API version ${String(held.apiVersion)}, listed by ${held.listedBy}`,
  ])
}

export function temperEsoGenerateConstants(argv: readonly string[], given: Given): Promise<Answer> {
  return answeredByPage(argv, given.calledAs, page, NAMED, (taken) => written(taken, given))
}
