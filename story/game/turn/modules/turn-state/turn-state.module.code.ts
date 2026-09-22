import type { Page } from "akasha/page/core/modules/page-types/page-types.module.code.ts"
import { addressIn } from "akasha/page/modules/address/page-address.module.code.ts"
import type { Quest } from "akasha/story/engine/core/modules/quest-schema/quest-schema.module.code.ts"
import type { RevealedSheet } from "akasha/story/engine/core/modules/revealed/revealed.module.code.ts"
import type {
  GameState,
  Hud,
} from "akasha/story/engine/core/modules/state-schema/state-schema.module.code.ts"
import {
  countIn,
  listIn,
  saidIn,
} from "akasha/story/game/entity/modules/sheet-reading/sheet-reading.module.code.ts"

const NAME = "name"
const MAX = "Max"
const SYSTEM = "system"
const LAST = -1
const LEVEL_UP = "level-up"
const ITEM_AWARD = "item-award"
const SKILL = "skill"
const NAMED_BY: ReadonlyMap<string, string> = new Map([
  ["affinity", "affinity"],
  ["class", "class"],
  ["title", "title"],
])
const LINES = "; "
const MARK = ": "
const NOT_FOUND = -1
const COMPLETE = "complete"
const ACTIVE = "active"

export type Numbers = Record<string, number>

export type Named = Record<string, unknown>

export function keyedIn(held: unknown, key: string, ending = ""): Numbers {
  const found: Numbers = {}
  for (const one of listIn(held)) {
    const name = saidIn(one[NAME])
    const value = countIn(one[key])
    if (name === undefined || value === undefined) continue
    found[`${name}${ending}`] = value
  }
  return found
}

export function attributesIn(held: unknown): Numbers {
  const found: Numbers = {}
  for (const one of listIn(held)) {
    const named = saidIn(one["attribute"])
    const score = countIn(one["score"])
    if (named === undefined || score === undefined) continue
    const address = addressIn(named)
    found[(address.kind === "qualified" ? address.slug : named).toUpperCase()] = score
  }
  return found
}

export function rungsIn(held: unknown): ReadonlyMap<string, string> {
  const found = new Map<string, string>()
  for (const one of listIn(held)) {
    const name = saidIn(one[NAME])
    const rung = saidIn(one["rung"])
    if (name !== undefined && rung !== undefined) found.set(name, rung)
  }
  return found
}

export function skillsIn(held: unknown, rungs: ReadonlyMap<string, string>): Named[] {
  return listIn(held).map((one) => {
    const name = saidIn(one[NAME])
    return {
      name,
      rung: name === undefined ? undefined : rungs.get(name),
      score: countIn(one["progress"]),
      note: saidIn(one["effect"]),
    }
  })
}

export function affinitiesIn(held: unknown): Named[] {
  return listIn(held).map((one) => ({
    name: saidIn(one[NAME]),
    value: countIn(one["counter"]),
    note: saidIn(one["effect"]),
  }))
}

export function notedIn(held: unknown): Named[] {
  return listIn(held).map((one) => ({ name: saidIn(one[NAME]), note: saidIn(one["note"]) }))
}

export function equippedIn(held: unknown): Named {
  const found: Named = {}
  for (const one of listIn(held)) {
    const slot = saidIn(one["slot"])
    if (slot !== undefined) found[slot] = { name: saidIn(one[NAME]) }
  }
  return found
}

export function carriedIn(held: unknown): Named[] {
  return notedIn(listIn(held).filter((one) => saidIn(one["slot"]) === undefined))
}

export function namesIn(held: unknown): string[] {
  return listIn(held)
    .map((one) => saidIn(one[NAME]))
    .filter((one) => one !== undefined)
}

export function revealedOf(player: Page, turn: Page): RevealedSheet {
  const name = saidIn(player.title)
  const kind = saidIn(player.kind)
  const level = countIn(player.level)
  const held = saidIn(player.class)
  return {
    ...(name === undefined ? {} : { name }),
    ...(kind === undefined ? {} : { kind }),
    ...(level === undefined ? {} : { level }),
    ...(held === undefined ? {} : { class: held }),
    attributes: attributesIn(player.attributes),
    skills: skillsIn(player.skills, rungsIn(turn.rungs)),
    affinities: affinitiesIn(player.affinities),
    bonds: notedIn(player.bonds),
    equipment: equippedIn(player.equipment),
    inventory: carriedIn(player.equipment),
    titles: namesIn(player.titles),
    derived: keyedIn(turn.derived, "number"),
  }
}

export function describedIn(note: string): Named[] {
  return note.split(LINES).map((one) => {
    const at = one.indexOf(MARK)
    if (at === NOT_FOUND) return { label: "", value: one }
    return { label: one.slice(0, at), value: one.slice(at + MARK.length) }
  })
}

export function windowOf(raised: Named): Named | undefined {
  const kind = saidIn(raised["kind"])
  if (kind === undefined) return undefined
  const name = saidIn(raised[NAME]) ?? ""
  const note = saidIn(raised["note"])
  const rung = saidIn(raised["rung"])
  if (kind === LEVEL_UP) return { type: kind, level: countIn(raised["level"]) }
  if (kind === ITEM_AWARD) {
    const award =
      note === undefined ? { item: name } : { item: name, descriptors: describedIn(note) }
    return { type: kind, award }
  }
  if (kind === SKILL) {
    return rung === undefined
      ? { type: kind, skill: name }
      : { type: kind, skill: name, rank: rung }
  }
  const key = NAMED_BY.get(kind)
  return key === undefined ? { type: kind } : { type: kind, [key]: name }
}

export function beatsIn(turns: readonly Page[]): Named[] {
  const found: Named[] = []
  for (const turn of turns) {
    const at = countIn(turn.number)
    for (const raised of listIn(turn.windows)) {
      const held = windowOf(raised)
      if (held !== undefined) found.push({ type: SYSTEM, turn: at, window: held })
    }
  }
  return found
}

export function hudOf(player: Page | null, turn: Page): Hud {
  const level = player === null ? undefined : countIn(player.level)
  return {
    ...(level === undefined ? {} : { level }),
    pools: { ...keyedIn(turn.pools, "now"), ...keyedIn(turn.pools, "most", MAX) },
    delta: keyedIn(turn.pools, "change"),
  }
}

export function questsIn(pages: readonly Page[]): Quest[] {
  const found: Quest[] = []
  for (const page of pages) {
    const id = saidIn(page.slug)
    const title = saidIn(page.title)
    const objective = saidIn(page.objective)
    if (id === undefined || title === undefined || objective === undefined) continue
    const reward = saidIn(page.reward)
    found.push({
      id,
      title,
      objective,
      ...(reward === undefined ? {} : { reward }),
      status: saidIn(page.status) === COMPLETE ? COMPLETE : ACTIVE,
    })
  }
  return found
}

export function stateOf(
  turns: readonly Page[],
  player: Page | null,
  quests: readonly Page[] = []
): GameState | null {
  const last = turns.at(LAST)
  if (last === undefined) return null
  const turn = countIn(last.number)
  if (turn === undefined) return null
  return {
    turn,
    hud: hudOf(player, last),
    ...(player === null ? {} : { revealed: revealedOf(player, last) }),
    log: beatsIn(turns),
    quests: questsIn(quests),
  }
}
