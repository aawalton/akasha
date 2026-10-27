import type { Quest } from "akasha/story/engine/core/modules/quest-schema/quest-schema.module.code.ts"
import type { RevealedSheet } from "akasha/story/engine/core/modules/revealed/revealed.module.code.ts"
import type { GameState } from "akasha/story/engine/core/modules/state-schema/state-schema.module.code.ts"
import type { Had } from "akasha/story/world/mechanics/items/story-item/modules/character-items-beside/character-items-beside.module.code.ts"
import type { Point } from "akasha/story/world/stories/played/modules/played-points/played-points.module.code.ts"
import type {
  Counted,
  Experience,
  Skill,
} from "akasha/story/world/stories/played/modules/played-sheet-rows/played-sheet-rows.module.code.ts"
import type { LedgerLine } from "akasha/story/world/stories/played/modules/purse-ledger/purse-ledger.module.code.ts"

function ledgersOf(
  ledgers: Readonly<Record<string, readonly LedgerLine[]>>
): Record<string, LedgerLine[]> {
  return Object.fromEntries(Object.entries(ledgers).map(([name, lines]) => [name, [...lines]]))
}

export type Filed = {
  readonly pools: Record<string, number>
  readonly delta: Record<string, number>
  readonly level?: number
  readonly attributes: Readonly<Record<string, number>>
  readonly resources?: Readonly<Record<string, string | number>>
  readonly experience?: readonly Experience[]
  readonly points?: readonly Point[]
  readonly purse?: Readonly<Record<string, string | number>>
  readonly ledgers?: Readonly<Record<string, readonly LedgerLine[]>>
  readonly skills: readonly Skill[]
  readonly traits: readonly Skill[]
  readonly legacies: readonly Skill[]
  readonly species?: string
  readonly calling?: string
  readonly rank?: string
  readonly status?: string
  readonly quests: readonly Quest[]
  readonly bonds: readonly Counted[]
  readonly attunements: readonly Counted[]
  readonly had: Had | null
}

function sheetOf(filed: Filed): RevealedSheet {
  return {
    ...(filed.level === undefined ? {} : { level: filed.level }),
    ...(Object.keys(filed.attributes).length === 0 ? {} : { attributes: { ...filed.attributes } }),
    ...(filed.resources === undefined ? {} : { resources: { ...filed.resources } }),
    ...(filed.experience === undefined ? {} : { experience: [...filed.experience] }),
    ...(filed.points === undefined ? {} : { points: [...filed.points] }),
    ...(filed.purse === undefined ? {} : { purse: { ...filed.purse } }),
    ...(filed.ledgers === undefined ? {} : { ledgers: ledgersOf(filed.ledgers) }),
    ...(filed.skills.length === 0 ? {} : { skills: [...filed.skills] }),
    ...(filed.traits.length === 0 ? {} : { traits: [...filed.traits] }),
    ...(filed.legacies.length === 0 ? {} : { legacies: [...filed.legacies] }),
    ...(filed.species === undefined ? {} : { kind: filed.species }),
    ...(filed.calling === undefined ? {} : { class: filed.calling }),
    ...(filed.rank === undefined ? {} : { rank: filed.rank }),
    ...(filed.status === undefined ? {} : { status: filed.status }),
    ...(filed.bonds.length === 0 ? {} : { bonds: [...filed.bonds] }),
    ...(filed.attunements.length === 0 ? {} : { affinities: [...filed.attunements] }),
    ...(filed.had === null
      ? {}
      : { equipment: { ...filed.had.worn }, inventory: [...filed.had.carried] }),
  }
}

function filedNothing(filed: Filed): boolean {
  return (
    Object.keys(filed.pools).length === 0 &&
    filed.level === undefined &&
    Object.keys(filed.attributes).length === 0 &&
    filed.purse === undefined &&
    filed.skills.length === 0 &&
    filed.traits.length === 0 &&
    filed.legacies.length === 0 &&
    filed.species === undefined &&
    filed.calling === undefined &&
    filed.rank === undefined &&
    filed.status === undefined &&
    filed.quests.length === 0 &&
    filed.bonds.length === 0 &&
    filed.attunements.length === 0 &&
    filed.had === null
  )
}

export function stateOf(filed: Filed, turn: number, name: string | undefined): GameState | null {
  if (filedNothing(filed)) return null
  return {
    turn,
    quests: [...filed.quests],
    hud: {
      ...(filed.level === undefined ? {} : { level: filed.level }),
      pools: { ...filed.pools },
      delta: { ...filed.delta },
    },
    revealed: {
      ...(name === undefined ? {} : { name }),
      ...sheetOf(filed),
    },
  }
}
