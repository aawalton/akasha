import type { Module } from "@akasha/code-system/module"

export const libSetsConstBase = {
  id: "01a061d6-3e1f-78d4-ae78-a17b737f3690",
  pageTypeSlug: "module",
  slug: "lib-sets-const-base",
  definition: "the library global as it first exists, before any set data fills it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The library global is created here rather than imported.",
    },
    {
      invariantKind: "departure",
      statement: "English is the language every other falls back to.",
    },
    {
      invariantKind: "departure",
      statement: "Japanese is listed among the languages and marked unsupported.",
    },
  ],
} as const satisfies Module
