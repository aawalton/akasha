import type {
  Reading,
  Sheet,
  Summed,
} from "akasha/story/game/game-mechanic/modules/linear-stat/linear-stat.module.code.ts"

export type Facing = {
  readonly attacker: Sheet
  readonly defender: Sheet
}

export type Faced =
  | { readonly answered: { readonly attackPower: number; readonly defense: number } }
  | { readonly refused: string }

type Stat = (reading: Reading) => Summed

export function attackBy(power: Stat, defence: Stat): (facing: Facing) => Faced {
  return (facing) => {
    const attackPower = power({ held: facing.attacker })
    if ("refused" in attackPower) return attackPower
    const defense = defence({ held: facing.defender })
    if ("refused" in defense) return defense
    return { answered: { attackPower: attackPower.answered, defense: defense.answered } }
  }
}
