import type { RecordProperty } from "akasha/page/record-property/record-property.page-type.types.ts"

export const bonusEffects = {
  id: "01a05fd1-d436-73c6-b34e-3d504facf23f",
  type: "page-type/record-property",
  slug: "bonus-effects",
  propertySlug: "effects",
  definition: "what a set bonus does, a metric or a buff to an entry",
  properties: [
    { pageProperty: "relation-property/effect-metric", required: false, many: false },
    { pageProperty: "text-property/effect-type", required: false, many: false },
    { pageProperty: "number-property/effect-value", required: false, many: false },
    { pageProperty: "one-of-property/buff-id", required: false, many: false },
    {
      pageProperty: "multi-relation-property/effect-while-buffs",
      required: false,
      many: true,
      maxCount: null,
    },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An entry naming a metric names no buff.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An entry naming a metric also has an effect type and an effect value.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-02T01:53:02.006Z",
  updatedAt: "2026-10-20T00:38:01.998Z",
} as const satisfies RecordProperty
