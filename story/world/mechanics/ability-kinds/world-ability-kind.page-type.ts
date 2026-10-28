import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const worldAbilityKind = {
  id: "01a17ff1-08c1-7ce1-ba38-4ef7f17de05a",
  type: "page-type/page-type",
  slug: "world-ability-kind",
  definition: "a kind of ability a world tells apart from its other kinds by name",
  pluralSlug: "ability-kinds",
  extends: ["page-type/world-mechanic"],
  parts: [
    "text-property/plural-title",
    "number-property/active-slots",
    "module/ability-kind-titles",
  ],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "text-property/plural-title", required: true, many: false },
    { pageProperty: "number-property/active-slots", required: false, many: false },
  ],
  runsTabooCheck: false,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An ability kind's title is what its world calls one ability of that kind.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Two kinds with one numeric structure are still two kinds where the world names them apart.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An ability naming no ability kind is called a Skill.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-10-28T00:37:45.279Z",
  updatedAt: "2026-10-28T00:57:47.694Z",
} as const satisfies PageType
