import { basename, dirname, extname, join } from "node:path"
import { changeMechanical } from "akasha/change/mechanical/change-mechanical.page-type.ts"
import { changeMechanicalFile } from "akasha/change/mechanical/file/change-mechanical-file.page-type.ts"
import { moveFile } from "akasha/change/mechanical/file/move/move-file/move-file.change-mechanical-file.ts"
import { moveFileCode } from "akasha/change/mechanical/file/move/move-file-code/move-file-code.change-mechanical.ts"
import { gathered, refusing } from "akasha/change/modules/answer/change-answer.module.code.ts"
import type { Answer } from "akasha/change/modules/answer/change-answer.module.types.ts"
import { claimedIn } from "akasha/change/modules/page-claiming/page-claiming.module.code.ts"
import { pageIn } from "akasha/change/modules/page-knowing/page-knowing.module.code.ts"
import { reach, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { referencesAt } from "akasha/page/modules/referencing/page-referencing.module.code.ts"

const MOVE_FILE = `${changeMechanicalFile.slug}/${moveFile.slug}` as const

const MOVE_FILE_CODE = `${changeMechanical.slug}/${moveFileCode.slug}` as const

const CODE = new Set([".ts", ".tsx"])

export type Asked = {
  readonly from: string
  readonly to: string
}

function addressFor(at: string): typeof MOVE_FILE_CODE | typeof MOVE_FILE {
  return CODE.has(extname(at)) ? MOVE_FILE_CODE : MOVE_FILE
}

export function landingFor(one: string, to: string): string {
  return join(dirname(to), basename(one))
}

export function carriedIn(beside: readonly string[], page: string): readonly string[] {
  const references = referencesAt(page)
  return [
    ...beside.filter((one) => one !== page && one !== references),
    ...beside.filter((one) => one === page),
    ...beside.filter((one) => one === references),
  ]
}

function besideIn(world: World, at: string): readonly string[] | string {
  try {
    const value = pageIn(world, at)
    if (value === null) return `\`${at}\` names no page, so no page is carried`
    return claimedIn(world, at, value)
  } catch (cause) {
    const why = cause instanceof Error ? cause.message : String(cause)
    return `${why}, so the files beside \`${at}\` were not worked out`
  }
}

export async function runChange(world: World, given: Asked): Promise<Answer> {
  if (basename(given.from) !== basename(given.to)) {
    return refusing(`\`${given.to}\` names the page anew, and a carry keeps the name a page has`)
  }
  const beside = besideIn(world, given.from)
  if (typeof beside === "string") return refusing(beside)
  const carried: Answer[] = []
  let seen = world
  for (const one of carriedIn(beside, given.from)) {
    if (seen.bodyOf(one) === null) continue
    const said = await reach(seen, addressFor(one), { from: one, to: landingFor(one, given.to) })
    if (said.said.refused !== null) return said.said
    carried.push(said.said)
    seen = said.world
  }
  return gathered(carried)
}
