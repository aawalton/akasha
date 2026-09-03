import type { PageType } from "@akasha/pages-system/page-type"

export const mobileCut = {
  id: "019f5141-c410-7cd1-b491-d017f10e568d",
  pageTypeSlug: "page-type",
  slug: "mobile-cut",
  definition: "one build of an app, and the state of the tree it was built from",
  pluralSlug: "mobile-cuts",
  extendsSlug: "page-type/page",
  properties: [],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A cut is named for its app and its build number.",
    },
    {
      invariantKind: "departure",
      statement:
        "A cut made before the build input tree hash was recorded carries none and reads as owed.",
    },
    {
      invariantKind: "departure",
      statement:
        "Which cut is newest is settled by its build number rather than by when its file landed.",
    },
    {
      invariantKind: "gap",
      statement: "What a cut remembers of its build stands as properties of this page type.",
    },
    {
      invariantKind: "gap",
      statement: "The cuts of this type stand as markdown outside akasha.",
    },
  ],
} as const satisfies PageType
