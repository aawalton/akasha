import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const worldCharacter = {
  id: "01a0657a-9ccd-7153-9c9f-c9454abc1a22",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "world-character",
  definition: "somebody a world's story follows",
  pluralSlug: "world-characters",
  extends: ["page-type/page"],
  runsTabooCheck: false,
  parts: [
    "number-property/event-count",
    "number-property/first-chapter",
    "number-property/last-chapter",
    "number-property/max-level",
  ],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "relation-property/world", required: false, many: false },
    { pageProperty: "number-property/max-level", required: false, many: false },
    { pageProperty: "number-property/event-count", required: false, many: false },
    { pageProperty: "number-property/first-chapter", required: false, many: false },
    { pageProperty: "number-property/last-chapter", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A character belongs to one world.",
    },
    {
      invariantKind: "departure",
      statement:
        "A character is the story's account of that character rather than a player's creation.",
    },
    {
      invariantKind: "departure",
      statement: "The words a character has are the story's rather than akasha's own.",
    },
    {
      invariantKind: "departure",
      statement: "A world's character readings name the characters of that world.",
    },
    {
      invariantKind: "gap",
      statement: "Every level a story gives a character is beside that character.",
    },
  ],
  types: "ts",
} as const satisfies PageType
