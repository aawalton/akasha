import type { Module } from "@akasha/code-system/module"

export const gpsCasts = {
  id: "01a0614d-4760-77ae-8327-bdf716931de5",
  pageTypeSlug: "module",
  slug: "gps-casts",
  definition: "what an untyped table the game hands over is taken to be",
  code: "ts",
  invariants: [
    {
      invariantKind: "absence",
      statement: "Nothing here checks a value at run time.",
    },
  ],
} as const satisfies Module
