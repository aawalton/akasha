const HERE = "story/game/game-mechanic/modules/dice-reading"

export type Rolled = {
  readonly total: number
  readonly crit: boolean
  readonly fumble: boolean
}

type Reading = { readonly faces: readonly number[] }

type Read = { readonly answered: Rolled } | { readonly refused: string }

export function readingBy(count: number, sides: number): (reading: Reading) => Read {
  return (reading) => {
    if (reading.faces.length !== count) {
      return { refused: `${count} dice came back as ${reading.faces.length}, ${HERE}` }
    }
    let total = 0
    for (const face of reading.faces) {
      if (!Number.isInteger(face) || face < 1 || face > sides) {
        return { refused: `a die of ${sides} sides cannot come up ${face}, ${HERE}` }
      }
      total += face
    }
    return { answered: { total, crit: total === count * sides, fumble: total === count } }
  }
}
