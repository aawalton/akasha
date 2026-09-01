import { askHere } from "../../../readouts/ask-here.ts"
import type { Ask } from "../../../readouts/readout-resolver.ts"

export function askVia(): Ask {
  return askHere()
}
