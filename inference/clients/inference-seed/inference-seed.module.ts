import type { Module } from "@akasha/code/module"

export const inferenceSeed = {
  id: "01a0682d-8ef5-7001-96f7-f3b6bb839422",
  pageTypeSlug: "module",
  type: "module",
  slug: "inference-seed",
  definition: "the seed a run is drawn with where the caller told none",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A seed the caller told is answered back unchanged.",
    },
    {
      invariantKind: "departure",
      statement: "A drawn seed is taken from the platform's random bytes.",
    },
    {
      invariantKind: "departure",
      statement:
        "A drawn seed is narrowed to a positive signed 32-bit integer so every service takes that seed.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches a service or reads the bytes a service made of the seed.",
    },
  ],
} as const satisfies Module
