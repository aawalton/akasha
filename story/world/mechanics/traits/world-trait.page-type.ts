import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const worldTrait = {
  id: "01a0ca5d-0f58-748c-a396-b0062affcee6",
  type: "page-type/page-type",
  slug: "world-trait",
  definition: "a lasting way the rules bend for one thing in a story",
  pluralSlug: "traits",
  extends: ["page-type/world-mechanic"],
  parts: ["relation-property/trait-story", "page-type/character-trait"],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "relation-property/trait-story", required: true, many: false },
  ],
  types: "ts",
  schema: "jsonl",
  createdAt: "2026-09-22T18:24:51.544Z",
  updatedAt: "2026-10-27T19:50:20.465Z",
} as const satisfies PageType
