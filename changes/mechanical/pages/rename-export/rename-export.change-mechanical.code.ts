import { typed } from "@akasha/code/code-typing"
import { importingOf } from "../../../../pages/indexes/path-naming/path-naming.module.code.ts"
import { refusing } from "../../../modules/change-answer/change-answer.module.code.ts"
import type { Answer } from "../../../modules/change-answer/change-answer.module.types.ts"
import { reach, type World } from "../../../modules/change-shadow/change-shadow.module.code.ts"

const RESPELL_EXPORT = "change-mechanical/respell-export"

const NAMED = /^[A-Za-z_$][A-Za-z0-9_$]*$/

const BESIDE = [".code.ts", ".code.tsx", ".test.ts", ".test.tsx", ".test-fixtures.ts"]

export type RenameExportAsked = {
  readonly at: string
  readonly of: string
  readonly to: string
}

function besideAPage(at: string): boolean {
  return BESIDE.some((one) => at.endsWith(one))
}

function whyNot(given: RenameExportAsked): string | null {
  if (!typed(given.at)) return `\`${given.at}\` names no TypeScript body`
  if (!besideAPage(given.at)) return `\`${given.at}\` is a page, and a page's export is its slug`
  if (!NAMED.test(given.of)) return `\`${given.of}\` is no name a body carries`
  if (!NAMED.test(given.to)) return `\`${given.to}\` is no name a body carries`
  if (given.of === given.to) return `\`${given.to}\` is the name it already carries`
  return null
}

export async function renameExport(world: World, given: RenameExportAsked): Promise<Answer> {
  const why = whyNot(given)
  if (why !== null) return refusing(why)
  const reading = importingOf(world.index, new Map([[given.at, given.at]]))
  if ("unread" in reading) return refusing(reading.unread)
  const over = [given.at, ...reading.importers]
  const respelled = await reach(world, RESPELL_EXPORT, {
    at: given.at,
    over,
    of: given.of,
    to: given.to,
  })
  return respelled.said
}

export async function runChange(world: World, given: RenameExportAsked): Promise<Answer> {
  return await renameExport(world, given)
}
