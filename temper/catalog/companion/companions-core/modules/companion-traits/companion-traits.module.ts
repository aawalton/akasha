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
      decisionKind: "decision-kind/gap",
      statement: "This table is written out from the companion pages rather than by hand.",
    },

    {
      decisionKind: "decision-kind/constraint",
      statement: "A trait's place in this table is the index a build hash has.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "A trait moved to another place breaks every build hash saved.",
    },
  ],
  hashIndexed: ["COMPANION_TRAIT_DATA"],
} as const satisfies Module
