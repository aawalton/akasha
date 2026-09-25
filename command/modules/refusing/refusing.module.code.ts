import {
  DATA,
  INPUT,
  refusedBy,
} from "akasha/command/modules/answering/command-answering.module.code.ts"
import type { Answer } from "akasha/command/modules/calling/calling.module.code.ts"

const NOTHING = "nothing was judged and nothing was written"

type Trouble = {
  readonly mistaken: readonly string[]
  readonly wrong: readonly string[]
}

export function mistaking(said: readonly string[]): Answer {
  return refusedBy(said, INPUT)
}

export function wrongData(said: string): Answer {
  return refusedBy([said], DATA)
}

export function troubling(found: Trouble): Answer | null {
  const said = [...found.mistaken, ...found.wrong]
  if (said.length === 0) return null
  return refusedBy([...said, NOTHING], found.mistaken.length > 0 ? INPUT : DATA)
}
