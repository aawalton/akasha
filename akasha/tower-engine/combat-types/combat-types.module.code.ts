export type AttrKey =
  | "MIGHT"
  | "FINESSE"
  | "VITALITY"
  | "INTELLECT"
  | "PERCEPTION"
  | "WILL"
  | "PRESENCE"
  | "LUCK"

export type Attributes = Record<AttrKey, number>

export type RollMode = "2d10" | "1d20"

export interface Sheet {
  name: string
  kind: "player" | "enemy" | "ally"
  level: number
  class?: string
  attributes: Attributes
  rollMode?: RollMode
  equipment?: { weapon?: { atk?: number } | null; armor?: { def?: number } | null }
  skills?: readonly { id: string; name: string; bonus?: number }[]
}

export interface Derived {
  hpMax: number
  stamMax: number
  focusMax: number
  initiative: number
  physAtk: number
  physDef: number
  mentDef: number
}

export interface Roll {
  mode: RollMode
  dice: readonly number[]
  total: number
  crit: boolean
  fumble: boolean
}

export type AtkMode = "phys" | "ment"

export interface ActionInput {
  attacker: Sheet
  defender: Sheet
  mode: AtkMode
  baseDamage: number
  skillBonus?: number
  intent: number
  gate?: number
  seed: number
}

export interface ActionResult {
  hit: boolean
  crit: boolean
  fumble: boolean
  roll: Roll
  attackPower: number
  intent: number
  skillBonus: number
  gate: number
  effectiveScore: number
  defense: number
  margin: number
  damage: number
  line: string
}
