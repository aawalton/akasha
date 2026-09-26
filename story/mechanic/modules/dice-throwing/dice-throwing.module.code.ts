import {
  type Rolled,
  readingBy,
} from "akasha/story/mechanic/modules/dice-reading/dice-reading.module.code.ts"
import {
  type Dice,
  facesFrom,
} from "akasha/story/mechanic/modules/dice-rolling/dice-rolling.module.code.ts"

export type Throw = { readonly dice: Dice; readonly roll: Rolled }

type Thrown = { readonly answered: Throw } | { readonly refused: string }

export function thrownFrom(seed: string, said: string): Thrown {
  const shown = facesFrom(seed, said)
  if ("refused" in shown) return shown
  const dice = shown.answered
  const read = readingBy(dice.faces.length, dice.sides)({ faces: dice.faces })
  if ("refused" in read) return read
  return { answered: { dice, roll: read.answered } }
}
