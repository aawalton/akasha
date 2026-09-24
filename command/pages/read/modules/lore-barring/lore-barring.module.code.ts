import {
  WITHHELD,
  withheldAt,
  withheldFor,
} from "akasha/story/lore-disclosure/modules/lore-withholding/lore-withholding.module.code.ts"

type Aimed = {
  readonly named: string
  readonly absolute: string
}

export type Barred<T extends Aimed> = {
  readonly kept: readonly T[]
  readonly refusal: string | null
}

const NOTHING_READ =
  "a file this read names is lore the world builder holds, so nothing was read here and nothing is recorded."

function leftOut(held: number): string {
  const one = held === 1
  return (
    `${held} file${one ? "" : "s"} your seat's reading reaches ${one ? "is" : "are"} lore the world ` +
    `builder holds, so ${one ? "it was" : "they were"} left out and the rest follows.`
  )
}

export function barredOf<T extends Aimed>(
  root: string,
  agentId: string,
  targets: readonly T[],
  bare: boolean
): Barred<T> {
  const withheld = withheldFor(root, agentId)
  if (withheld.length === 0) return { kept: targets, refusal: null }
  const kept = targets.filter((one) => !withheldAt(one.absolute, withheld))
  const held = targets.length - kept.length
  if (held === 0) return { kept, refusal: null }
  return { kept, refusal: [bare ? leftOut(held) : NOTHING_READ, "", ...WITHHELD].join("\n") }
}
