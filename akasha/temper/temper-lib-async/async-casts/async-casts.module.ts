import type { Module } from "@akasha/code-system/module"

export const asyncCasts = {
  id: "01a0606a-1c54-73cf-ae99-1c6521dc4d94",
  pageTypeSlug: "module",
  slug: "async-casts",
  definition: "the assertions handing an untyped Lua value to TypeScript as a named shape",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A cast here changes no value.",
    },
  ],
} as const satisfies Module
