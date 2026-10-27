import { loadedOff } from "akasha/code/body/modules/body-loading/body-loading.module.code.ts"
import { upkeepReading } from "akasha/command/argument/pages/upkeep-reading.argument.ts"
import { DATA, INPUT } from "akasha/command/modules/answering/command-answering.module.code.ts"
import {
  castingIndexed,
  characterRefused,
} from "akasha/command/pages/story/modules/settle-character/settle-character.module.code.ts"
import {
  type Odds,
  oddsIndexed,
} from "akasha/command/pages/story/modules/settle-difficulty/settle-difficulty.module.code.ts"
import {
  lineChained,
  linesIn,
  unmadeLogged,
} from "akasha/command/pages/story/modules/settle-seeding/settle-seeding.module.code.ts"
import type {
  Checked,
  Montage,
} from "akasha/command/pages/story/montage/modules/montage-running/montage-running.module.code.ts"
import type { Taken } from "akasha/command/pages/story/montage/modules/montage-taking/montage-taking.module.code.ts"
import {
  chaptersIndexed,
  onDisk,
  outcomesAt,
  settlingIndexed,
  type Turn,
  turnsIndexed,
} from "akasha/command/pages/story/settle/story-settle.command.code.ts"
import {
  listedAt,
  valueByPath,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { exportedAs } from "akasha/page/modules/export-name/page-export-name.module.code.ts"
import { worldCheck } from "akasha/story/world/mechanics/checks/world-check.page-type.ts"
import { storyOpensAt } from "akasha/story/world/stories/played/properties/story-opens-at.instant-property.ts"
import { storyPlayed } from "akasha/story/world/stories/played/story-played.page-type.ts"
import {
  GAME_MASTER,
  stepIn,
} from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"
import { turnEndsAt } from "akasha/story/world/stories/played/turns/properties/turn-ends-at.instant-property.ts"
import { turnInterruptsAt } from "akasha/story/world/stories/played/turns/properties/turn-interrupts-at.instant-property.ts"

const UPKEEP = "upkeep"

const TIME_PASSING = "time-passing"

export const NEXT = "next"

const STEP_STATUS = "stepStatus"

const ENDS_AT = exportedAs(turnEndsAt.propertySlug)

const OPENS_AT = exportedAs(storyOpensAt.propertySlug)

const INTERRUPTS_AT = exportedAs(turnInterruptsAt.propertySlug)

type Held<Of> = { readonly answered: Of } | { readonly refused: string }

export type Refusing = { readonly refused: string; readonly by: typeof DATA | typeof INPUT }

export type Placed = {
  readonly montage: Montage
  readonly on: Turn
  readonly at: string
  readonly codes: ReadonlyMap<string, string>
  readonly odds: Odds | null
  readonly unmade: number
}

type Coded = { readonly code: string; readonly check: string }

function turnOf(turns: readonly Turn[], held: Taken): Turn | undefined {
  if (held.turn !== null) return turns.find((one) => one.slug === held.turn)
  return turns.toSorted((a, b) => a.position - b.position).at(-1)
}

function fromOf(root: string, turns: readonly Turn[], on: Turn, story: string): string | null {
  const own = valueByPath(root, on.at)?.[ENDS_AT]
  if (typeof own === "string") return own
  const before = turns
    .filter((one) => one.position < on.position)
    .toSorted((a, b) => b.position - a.position)
  for (const one of before) {
    const ends = valueByPath(root, one.at)?.[ENDS_AT]
    if (typeof ends === "string") return ends
  }
  const listed = listedAt(root, storyPlayed.slug, story)[0]
  const opens = listed === undefined ? undefined : valueByPath(root, listed.path)?.[OPENS_AT]
  return typeof opens === "string" ? opens : null
}

function sessionedCode(root: string, check: string, role: string): Held<string> {
  const code = settlingIndexed(root, check)
  if (code === null) return { refused: `\`${check}\` names no check here` }
  if (typeof loadedOff(root, code)[NEXT] !== "function") {
    return { refused: `\`${check}\` exports no \`${NEXT}\`, so it is no montage's ${role}` }
  }
  return { answered: code }
}

function upkeepFor(root: string, held: Taken): Held<Coded | null> {
  const check = `${held.story}-${UPKEEP}`
  const code = settlingIndexed(root, check)
  if (code === null && held.upkeep === null) return { answered: null }
  if (code === null) {
    return {
      refused: `\`${held.story}\` charges no upkeep, so \`${upkeepReading.said}\` is said for nothing`,
    }
  }
  if (held.upkeep === null) {
    return {
      refused: `\`${held.story}\` charges upkeep by \`${check}\`, so a montage says \`${upkeepReading.said}\``,
    }
  }
  const sessioned = sessionedCode(root, check, UPKEEP)
  if ("refused" in sessioned) return sessioned
  return { answered: { code: sessioned.answered, check } }
}

function addressOf(check: string): string {
  return `${worldCheck.slug}/${check}`
}

function checkedOf(check: string, reading: Record<string, unknown>, dice: string | null): Checked {
  return { check: addressOf(check), reading, dice }
}

function stepRefused(root: string, on: Turn): Refusing | null {
  if (stepIn(valueByPath(root, on.at)?.[STEP_STATUS]) === GAME_MASTER) return null
  const why = `\`${on.slug}\` is not at ${GAME_MASTER}, and a montage is settled only there`
  return { refused: why, by: DATA }
}

function characterOf(root: string, held: Taken): Refusing | null {
  const casting = castingIndexed(root, held.story)
  for (const reading of [held.reading, held.upkeep]) {
    const unmeant = reading === null ? null : characterRefused(reading, casting)
    if (unmeant !== null) return { refused: unmeant, by: INPUT }
  }
  return null
}

function timeOf(root: string, story: string): Held<Coded> {
  const check = `${story}-${TIME_PASSING}`
  const code = settlingIndexed(root, check)
  if (code === null) return { refused: `\`${story}\` has no \`${check}\`, so it runs no montage` }
  return { answered: { check, code } }
}

export function placedFor(root: string, held: Taken): Placed | Refusing {
  const unmeant = characterOf(root, held)
  if (unmeant !== null) return unmeant
  const turns = turnsIndexed(root, held.story)
  const on = turnOf(turns, held)
  if (on === undefined) return { refused: `\`${held.story}\` has no such turn here`, by: DATA }
  const unplaced = stepRefused(root, on)
  if (unplaced !== null) return unplaced
  const time = timeOf(root, held.story)
  if ("refused" in time) return { refused: time.refused, by: DATA }
  const activity = sessionedCode(root, held.check, "activity")
  if ("refused" in activity) return { refused: activity.refused, by: DATA }
  const upkeep = upkeepFor(root, held)
  if ("refused" in upkeep) return { refused: upkeep.refused, by: INPUT }
  const from = fromOf(root, turns, on, held.story)
  if (from === null) return { refused: `\`${on.slug}\` has no time to start from`, by: DATA }
  const at = outcomesAt(on.at)
  if (at === null) return { refused: `\`${on.at}\` has no outcomes beside it`, by: DATA }
  const odds = held.dice === null ? { answered: null } : oddsIndexed(root, held.story, held.check)
  if ("refused" in odds) return { refused: odds.refused, by: DATA }
  const read = onDisk(root)
  const chained = turns
    .filter((one) => one.position <= on.position)
    .map((one) => ({ position: one.position, outcomes: outcomesAt(one.at) }))
  const interrupts = valueByPath(root, on.at)?.[INTERRUPTS_AT]
  const upkept = upkeep.answered
  const codes = new Map([
    [addressOf(time.answered.check), time.answered.code],
    [addressOf(held.check), activity.answered],
  ])
  if (upkept !== null) codes.set(addressOf(upkept.check), upkept.code)
  const upkeepChecked =
    upkept === null || held.upkeep === null ? null : checkedOf(upkept.check, held.upkeep, null)
  return {
    montage: {
      time: addressOf(time.answered.check),
      activity: checkedOf(held.check, held.reading, held.dice),
      upkeep: upkeepChecked,
      from,
      every: held.every,
      bounds: { sessions: held.sessions, until: held.until, crossing: held.crossing },
      interruptsAt: typeof interrupts === "string" ? interrupts : null,
      before: lineChained(read, chained, chaptersIndexed(root, held.story)),
      place: linesIn(read, at).length,
    },
    on,
    at,
    codes,
    odds: odds.answered,
    unmade: held.dice === null ? 0 : unmadeLogged(root, [on.at, at]),
  }
}
