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
import { temperEsoGenerateReturns as page } from "akasha/command/pages/temper/eso/generate/returns/temper-eso-generate-returns.command.ts"
import { codeRoot } from "akasha/page/modules/code-root/code-root.module.code.ts"
import { esouiDocPath } from "akasha/temper/eso/path/modules/eso-paths/eso-paths.module.code.ts"
import {
  engineReturnsIn,
  returnsBody,
} from "akasha/temper/eso/return/modules/engine-returns-reading/engine-returns-reading.module.code.ts"
import { RETURNS_AT } from "akasha/temper/eso/return/modules/engine-returns-seeding/engine-returns-seeding.module.code.ts"

const NAMED = [codeRootArgument] as const

const PUT = `${changeMechanical.slug}/${addFileOfAnyKind.slug}` as const

const MESSAGE = "Write what the game says every function gives back"

type Taken = Taking<typeof page, typeof NAMED>

async function written(taken: Taken, given: Given): Promise<Answer> {
  const named = taken.codeRoot ?? codeRoot()
  let root: string
  try {
    root = realpathSync(named)
  } catch {
    return refused(`\`${named}\` is no checkout on this disk, so nothing was read or written`, DATA)
  }

  const from = esouiDocPath()
  let doc: string
  try {
    doc = await readFile(from, "utf8")
  } catch {
    return refused(`\`${from}\` is no file this can read, so there is nothing to write`, DATA)
  }

  const held = engineReturnsIn(doc)
  const names = Object.keys(held.returns)
  if (names.length === 0) {
    return refused(`\`${from}\` names no function, so the table was left as it is`, DATA)
  }

  const body = returnsBody(held)
  let was: string | null = null
  try {
    was = await readFile(join(root, RETURNS_AT), "utf8")
  } catch {
    was = null
  }
  if (was === body) {
    return told([
      `\`${RETURNS_AT}\` already holds what the documentation says, so nothing landed`,
      `read from ${from} at API version ${String(held.apiVersion)}`,
    ])
  }

  const asked: readonly Asking[] = [{ at: PUT, given: { at: RETURNS_AT, body } }]
  const landed = await runMechanicalChange(root, asked, MESSAGE, { writer: given.calledAs })
  if ("refusals" in landed) {
    return refused(`the return kinds were not landed — ${landed.refusals.join("; ")}`, OPERATIONAL)
  }
  if (landed.landed.length === 0) {
    return refused(
      `\`${RETURNS_AT}\` differs from the documentation and nothing landed — ${landed.said.join("; ")}`,
      OPERATIONAL
    )
  }

  const silent = names.filter((name) => (held.returns[name] ?? []).length === 0).length
  return told([
    `${String(names.length)} function(s) landed in \`${RETURNS_AT}\``,
    `${String(silent)} of them give back nothing`,
    `read from ${from} at API version ${String(held.apiVersion)}`,
  ])
}

export function temperEsoGenerateReturns(argv: readonly string[], given: Given): Promise<Answer> {
  return answeredByPage(argv, given.calledAs, page, NAMED, (taken) => written(taken, given))
}
