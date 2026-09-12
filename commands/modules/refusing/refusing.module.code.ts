import {
  DATA,
  INPUT,
  refusedBy,
} from "akasha/commands/modules/answering/command-answering.module.code.ts"
import type { Answer } from "akasha/commands/modules/calling/calling.module.code.ts"

const NOTHING = "nothing was judged and nothing was written"

export type Trouble = {
  readonly mistaken: readonly string[]
  readonly wrong: readonly string[]
}

export function mistaking(said: readonly string[]): Answer {
  return refusedBy(said, INPUT)
}

export function troubling(found: Trouble): Answer | null {
  const said = [...found.mistaken, ...found.wrong]
  if (said.length === 0) return null
  return refusedBy([...said, NOTHING], found.mistaken.length > 0 ? INPUT : DATA)
}
