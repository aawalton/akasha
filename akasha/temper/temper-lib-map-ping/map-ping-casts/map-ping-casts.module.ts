import type { Module } from "@akasha/code-system/module"

export const mapPingCasts = {
  id: "01a0605f-6260-78c9-885b-2ba545ad7f6f",
  pageTypeSlug: "module",
  slug: "map-ping-casts",
  definition: "what an untyped ping value the game hands over is taken to be",
  code: "ts",
  invariants: [
    {
      invariantKind: "absence",
      statement: "Nothing here checks a value at run time.",
    },
  ],
} as const satisfies Module
