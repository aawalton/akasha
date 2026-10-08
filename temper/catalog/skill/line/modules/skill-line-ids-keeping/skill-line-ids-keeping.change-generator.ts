import type { ChangeGenerator } from "akasha/change/generator/change-generator.page-type.types.ts"

export const skillLineIdsKeeping = {
  id: "01a0df08-262b-73d8-9c3d-0b76baed9088",
  type: "page-type/change-generator",
  slug: "skill-line-ids-keeping",
  definition: "the type naming every skill line by its id, written again from the skill line pages",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The type is written by a machine from the skill line pages rather than by an author.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A skill line's id is its page's slug.",
    },
  ],
  createdAt: "2026-09-26T18:44:08.363Z",
  updatedAt: "2026-09-26T18:44:36.000Z",
} as const satisfies ChangeGenerator
