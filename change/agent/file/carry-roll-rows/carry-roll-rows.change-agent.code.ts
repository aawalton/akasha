import { changeMechanical } from "akasha/change/mechanical/change-mechanical.page-type.ts"
import { addFileOfAnyKind } from "akasha/change/mechanical/file/add/add-file-of-any-kind/add-file-of-any-kind.change-mechanical.ts"
import {
  type Answer,
  missing,
  refusing,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import { reach, type World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { isRecord } from "akasha/code/type/narrowing/modules/is-record/is-record.module.code.ts"
import { textIn } from "akasha/code/type/narrowing/modules/text-in/text-in.module.code.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { gameMechanic } from "akasha/story/game/mechanic/game-mechanic.page-type.ts"
import {
  followingOn,
  lineOf,
  type MechanicRun,
} from "akasha/story/game/mechanic/modules/mechanic-run/mechanic-run.module.code.ts"
import { attackResolution } from "akasha/story/game/mechanic/pages/attack-resolution/attack-resolution.game-mechanic.ts"
import { attributeCheck } from "akasha/story/game/mechanic/pages/attribute-check/attribute-check.game-mechanic.ts"
import { leveling } from "akasha/story/game/mechanic/pages/leveling/leveling.game-mechanic.ts"

const HERE = "change/agent/file/carry-roll-rows"

const FROM = "from"

const TO = "to"

const MODE = "mode"

const ATTR = "attr"

const TURN = "turn"

const SEED = "seed"

const RESULT = "result"

const SPENT = "allocation"

const STRIKE = namedAs(gameMechanic.slug, attackResolution.slug, null)

const CHECK = namedAs(gameMechanic.slug, attributeCheck.slug, null)

const WON = namedAs(gameMechanic.slug, leveling.slug, null)

const ADD_FILE = `${changeMechanical.slug}/${addFileOfAnyKind.slug}` as const

function mechanicIn(row: Record<string, unknown>): string {
  if (row[MODE] !== undefined) return STRIKE
  return textIn(row[ATTR])?.includes(SPENT) === true ? WON : CHECK
}

function seedIn(held: unknown): string | null {
  if (typeof held === "number") return String(held)
  return textIn(held)
}

function carriedFrom(text: string): readonly string[] | string {
  const lines: string[] = []
  let follows: string | null = null
  for (const line of text.split("\n")) {
    if (line.trim() === "") continue
    const held: unknown = JSON.parse(line)
    if (!isRecord(held)) return `a line here is no row, ${HERE}`
    const turn = held[TURN]
    if (typeof turn !== "number") return `a row here names no turn, ${HERE}`
    const run: MechanicRun = {
      turn,
      mechanic: mechanicIn(held),
      reading: held,
      answered: null,
      bonuses: [],
      seed: seedIn(held[SEED]),
      follows,
      said: textIn(held[RESULT]),
    }
    const written = lineOf(run)
    lines.push(written)
    follows = followingOn(written)
  }
  return lines
}

export type Asked = Readonly<Record<string, string>>

export const takes: readonly string[] = [FROM, TO]

export async function runChange(world: World, given: Asked): Promise<Answer> {
  const from = given[FROM]
  if (from === undefined) return refusing(missing(FROM))
  const to = given[TO]
  if (to === undefined) return refusing(missing(TO))
  const text = world.textOf(from)
  if (text === null) return refusing(`\`${from}\` holds no body, ${HERE}`)
  const carried = carriedFrom(text)
  if (typeof carried === "string") return refusing(carried)
  const body = `${carried.join("\n")}\n`
  return (await reach(world, ADD_FILE, { at: to, body })).said
}
