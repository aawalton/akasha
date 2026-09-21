const HERE = "story/game/mechanic/pages/linear-stat"

export type Rounding = "none" | "down" | "up" | "nearest"

export type Term = {
  readonly of: string
  readonly by: number
}

export type Asking = {
  readonly terms: readonly Term[]
  readonly constant: number
  readonly rounding: Rounding
  readonly held: Readonly<Record<string, number>>
}

export type Answered = { readonly answered: number } | { readonly refused: string }

function roundedBy(rounding: Rounding, sum: number): number {
  if (rounding === "down") return Math.floor(sum)
  if (rounding === "up") return Math.ceil(sum)
  if (rounding === "nearest") return Math.round(sum)
  return sum
}

export function runMechanic(asking: Asking): Answered {
  let sum = asking.constant
  for (const term of asking.terms) {
    const value = asking.held[term.of]
    if (value === undefined) {
      return {
        refused: `the sheet holds no \`${term.of}\`, and a term naming it counts nothing, ${HERE}`,
      }
    }
    sum += value * term.by
  }
  return { answered: roundedBy(asking.rounding, sum) }
}
