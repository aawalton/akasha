const HERE = "story/game/game-mechanic/modules/linear-stat"

export type Rounding = "none" | "down" | "up" | "nearest"

export type Term = {
  readonly of: string
  readonly by: number
}

export type Sheet = Readonly<Record<string, number>>

export type Reading = { readonly held: Sheet }

export type Summing = {
  readonly terms: readonly Term[]
  readonly constant: number
  readonly rounding: Rounding
  readonly held: Sheet
}

export type Summed = { readonly answered: number } | { readonly refused: string }

function roundedBy(rounding: Rounding, sum: number): number {
  if (rounding === "down") return Math.floor(sum)
  if (rounding === "up") return Math.ceil(sum)
  if (rounding === "nearest") return Math.round(sum)
  return sum
}

export function summed(summing: Summing): Summed {
  let sum = summing.constant
  for (const term of summing.terms) {
    const value = summing.held[term.of]
    if (value === undefined) return { refused: `the sheet holds no \`${term.of}\`, ${HERE}` }
    sum += value * term.by
  }
  return { answered: roundedBy(summing.rounding, sum) }
}

export function summingBy(
  terms: readonly Term[],
  constant: number,
  rounding: Rounding
): (reading: Reading) => Summed {
  return (reading) => summed({ terms, constant, rounding, held: reading.held })
}
