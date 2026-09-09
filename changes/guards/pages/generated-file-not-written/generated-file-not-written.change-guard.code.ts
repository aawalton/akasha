import { type Facing, generatedIn } from "@akasha/indexes/property-carrying"
import type { Guard, Guarding } from "../../../modules/guarding/change-guarding.module.types.ts"

const BY_HAND = "a generated file is written by the thing that generates it rather than by hand"

function facingIn(given: Guarding): Facing {
  return {
    kindsUnder: (of) => given.shadow.index.kindsUnder(of),
    everyOfType: (kind) => given.shadow.index.everyOfType(kind),
    valueAt: (path) => given.shadow.pageOf(path),
    carryingOf: (named) => given.shadow.index.carryingOf(named),
  }
}

export function generatedFileNotWritten(given: Guarding): string | null {
  const asking = facingIn(given)
  for (const one of given.said.edits) {
    if (one.kind !== "replace") continue
    if (generatedIn(asking, one.path)) return `\`${one.path}\` is generated, and ${BY_HAND}`
  }
  return null
}

export const runGuard: Guard = generatedFileNotWritten
