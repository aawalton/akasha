import { createHash } from "node:crypto"

const HERE = "story/game/game-mechanic/modules/dice-rolling"
const DIGEST = "sha256"
const SAID = /^([1-9][0-9]*)d([1-9][0-9]*)$/
const WORD_BYTES = 4
const WORDS = 8
const SPAN = 2 ** 32
const FIRST_FACE = 1
const LEAST_DICE = 1
const MOST_DICE = 100
const LEAST_SIDES = 2
const MOST_SIDES = 1000

export type Dice = {
  readonly said: string
  readonly sides: number
  readonly faces: readonly number[]
}

export type Shown = { readonly answered: Dice } | { readonly refused: string }

function wordsFrom(seed: string, round: number): readonly number[] {
  const bytes = createHash(DIGEST).update(`${seed}/${round}`).digest()
  const found: number[] = []
  for (let at = 0; at < WORDS; at += 1) found.push(bytes.readUInt32BE(at * WORD_BYTES))
  return found
}

export function facesFrom(seed: string, said: string): Shown {
  const found = SAID.exec(said)
  if (found === null) return { refused: `\`${said}\` is no handful of dice, ${HERE}` }
  const count = Number(found[1])
  const sides = Number(found[2])
  if (!(count >= LEAST_DICE && count <= MOST_DICE)) {
    return { refused: `${count} dice is more than the ${MOST_DICE} rolled at once, ${HERE}` }
  }
  if (!(sides >= LEAST_SIDES && sides <= MOST_SIDES)) {
    return { refused: `a die of ${sides} sides is no die, ${HERE}` }
  }
  const most = SPAN - (SPAN % sides)
  const faces: number[] = []
  for (let round = 0; faces.length < count; round += 1) {
    for (const word of wordsFrom(seed, round)) {
      if (faces.length === count) break
      if (word >= most) continue
      faces.push((word % sides) + FIRST_FACE)
    }
  }
  return { answered: { said, sides, faces } }
}
