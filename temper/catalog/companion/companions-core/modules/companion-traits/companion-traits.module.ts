import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const companionTraits = {
  id: "01a06108-076e-76c3-9e85-b58e3d430303",
  type: "page-type/module",
  slug: "companion-traits",
  definition:
    "every property a piece of companion equipment is worked with, and what each is worth",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A trait is answered from the held companion catalogue rather than from a table in code.",
    },
  ],
} as const satisfies Module
