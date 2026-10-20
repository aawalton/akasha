import { decodeBuild } from "akasha/temper/player/character/build/build-codec/modules/build-codec/build-codec.module.code.ts"
import type { CharacterState } from "akasha/temper/player/character/build/modules/build-types/build-types.module.code.ts"
import { buildHash } from "akasha/temper/player/character/formula-framework/modules/branded-id/branded-id.module.code.ts"

export const DESIGN_HASH =
  "ATQKVIFAQABiyIAGTD1AAEtzaAAZbm0AASHNoAAkObQADLc2gACW5tABANzaACADm0AEAS1oAMAAc2gBMg3aAN_IeWBguj2NoAAAAAAAAAIEAAAAAAAAAAEAAAAAAAAAAAAgAQAAAAAAAAAAAAAAAAAAgIAAISMq9evXALFq1aBQFChQoABAAZAg"

export const CHARACTER_HASH =
  "ATQKVIFAQABkRYIGXvtAAEoraAAZbm0AAS3NoAAlubQADLc2gACW5tABClDaACFKG0AEIPuoAMMBLWgBMg3bcsPJEGBguj2NqHoAAAAAAA2ogicAAIWAGANBYCkQBIGhYBJ3q2IA7pEDCA-IEIODAEgcgAIcIhQhNDMyIiMCI1IDMxIAMjIzMzMEIAMjA0oyM6JkMjMjACOCSjMzI6AAAAAAsAAAAQ8fQLAAAAAFGAYQOIEihYweAAAyDjEgaw"

export function decoded(hash: string): CharacterState {
  const build = decodeBuild(buildHash(hash))
  if (build === null) throw new Error("the fixture hash does not decode")
  return build
}
