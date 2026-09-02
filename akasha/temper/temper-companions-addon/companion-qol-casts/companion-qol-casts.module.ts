import type { Module } from "@akasha/code-system/module"

export const companionQolCasts = {
  id: "01a0611d-84c4-7502-90cd-7bbaa684cb7d",
  pageTypeSlug: "module",
  slug: "companion-qol-casts",
  definition: "reading a value of a known kind out of a saved variables table",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A value of the wrong kind reads back as the fallback rather than raising.",
    },
  ],
} as const satisfies Module
