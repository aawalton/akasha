import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const worldElement = {
  id: "01a0ca6d-c8e0-7304-b515-37e66f045ec1",
  type: "page-type/page-type",
  slug: "world-element",
  definition: "a kind of essence a world is made of",
  pluralSlug: "elements",
  extends: ["page-type/world-mechanic"],
  parts: [],
  properties: [{ pageProperty: "text-property/title", required: true, many: false }],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An element is in a world whether or not a character senses it.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-09-22T18:43:07.616Z",
  updatedAt: "2026-10-27T20:05:18.843Z",
} as const satisfies PageType
