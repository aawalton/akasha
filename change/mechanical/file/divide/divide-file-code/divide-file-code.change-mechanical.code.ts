import { changeMechanical } from "akasha/change/mechanical/change-mechanical.page-type.ts"
import { addFileCode } from "akasha/change/mechanical/file/add/add-file-code/add-file-code.change-mechanical.ts"
import {
  type Answer,
  type FileChange,
  refusing,
  stating,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import {
  passagesOf,
  plannedCarrying,
} from "akasha/change/modules/code-export-carrying/code-export-carrying.module.code.ts"
import { reach, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"

const ADD_FILE_CODE = `${changeMechanical.slug}/${addFileCode.slug}` as const

const SPACED = /\s+/

const NO_NAME = "no export was named, so nothing is carried"

const CARRIED_BY = "`move-code-export` carries an export into a body already there"

export type Asked = {
  readonly from: string
  readonly to: string
  readonly of: string
}

export function readIn(said: string): readonly string[] {
  const held = said.trim()
  return held === "" ? [] : held.split(SPACED)
}

export async function runChange(world: World, given: Asked): Promise<Answer> {
  const of = readIn(given.of)
  if (of.length === 0) return refusing(NO_NAME)
  if (world.textOf(given.to) !== null) {
    return refusing(`\`${given.to}\` is a body already, and ${CARRIED_BY}`)
  }
  const made = plannedCarrying(world, { from: given.from, to: given.to, of })
  if ("refused" in made) return refusing(made.refused)
  const added = await reach(world, ADD_FILE_CODE, { at: given.to, body: made.body })
  if (added.said.refused !== null) return added.said
  const left: readonly FileChange[] = passagesOf(made).map((one) => ({
    kind: "replace",
    path: one.at,
    contentFrom: one.old,
    contentTo: one.new,
  }))
  return stating([...added.said.edits, ...left])
}
