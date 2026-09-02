import type { Module } from "@akasha/code-system/module"

export const journalCasts = {
  id: "01a0617d-544d-7f97-9ea4-d789662cd65d",
  pageTypeSlug: "module",
  slug: "journal-casts",
  definition: "what a control or table the game hands over is taken to be",
  code: "ts",
  invariants: [
    {
      invariantKind: "absence",
      statement: "Nothing here checks a value at run time.",
    },
  ],
} as const satisfies Module
