import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const storyBuild = {
  id: "01a06578-d638-74fa-9fea-d5dfb9cf10ec",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "story-build",
  definition: "what a played character's numbers are at one chapter",
  pluralSlug: "story-builds",
  extends: ["page-type/page"],
  runsTabooCheck: false,
  parts: ["number-property/build-level", "text-property/class-name", "text-property/game-system"],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "relation-property/world", required: false, many: false },
    { pageProperty: "number-property/chapter-number", required: false, many: false },
    { pageProperty: "number-property/build-level", required: false, many: false },
    { pageProperty: "text-property/class-name", required: false, many: false },
    { pageProperty: "text-property/game-system", required: false, many: false },
    { pageProperty: "file-property/prose", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A build is true as of the chapter the build names.",
    },
    {
      invariantKind: "departure",
      statement: "A build has the rules a reader reads the build against.",
    },
    {
      invariantKind: "departure",
      statement: "The words a build carries are the story's rather than akasha's own.",
    },
  ],
  types: "ts",
} as const satisfies PageType
