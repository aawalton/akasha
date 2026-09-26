import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const partnersTalent = {
  id: "01a0de4f-b5bb-7bc2-9f70-e82f1b4b6921",
  type: "page-type/page-type",
  slug: "partners-talent",
  definition: "the one gift a person in Partners carries, unique to them",
  pluralSlug: "talents",
  extends: ["page-type/character-trait"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A Talent does not level; it deepens.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
