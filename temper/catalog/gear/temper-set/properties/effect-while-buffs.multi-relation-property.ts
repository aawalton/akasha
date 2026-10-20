import type { MultiRelationProperty } from "akasha/page/multi-relation-property/multi-relation-property.page-type.types.ts"

export const effectWhileBuffs = {
  id: "01a156be-6a0f-7c5a-892e-537fd0f717f1",
  type: "page-type/multi-relation-property",
  slug: "effect-while-buffs",
  propertySlug: "while-buffs",
  definition: "the buffs a set bonus effect holds only while one of them is up",
  targetPageType: "page-type/temper-buff-other",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An effect naming no buff here holds whatever buffs are up.",
    },
  ],
  types: "ts",
  createdAt: "2026-10-20T00:38:01.998Z",
  updatedAt: "2026-10-20T00:38:01.998Z",
} as const satisfies MultiRelationProperty
