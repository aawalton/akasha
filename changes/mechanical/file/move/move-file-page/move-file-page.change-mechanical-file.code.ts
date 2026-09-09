import { basename, dirname, extname, join } from "node:path"
import { gathered, refusing } from "../../../../modules/answer/change-answer.module.code.ts"
import type { Answer } from "../../../../modules/answer/change-answer.module.types.ts"
import { reach, type World } from "../../../../modules/change-shadow/change-shadow.module.code.ts"
import { claimedIn } from "../../../../modules/page-claiming/page-claiming.module.code.ts"
import { pageIn } from "../../../../modules/page-knowing/page-knowing.module.code.ts"

const MOVE_FILE = "change-mechanical-file/move-file"

const MOVE_FILE_CODE = "change-mechanical/move-file-code"

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
  for (const one of beside) {
    if (seen.bodyOf(one) === null) continue
    const said = await reach(seen, addressFor(one), { from: one, to: landingFor(one, given.to) })
    if (said.said.refused !== null) return said.said
    carried.push(said.said)
    seen = said.world
  }
  return gathered(carried)
}
