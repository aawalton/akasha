import type { PageType } from "@akasha/pages-system/page-type"

export const seatConditions = {
  id: "01a06837-f101-7420-89ad-7e146f4cbaf5",
  pageTypeSlug: "page-type",
  slug: "seat-conditions",
  definition: "what a seat settles for an agent before the agent starts working there",
  pluralSlug: "seat-conditions-documents",
  extendsSlug: "page-type/page",
  invariants: [
    {
      invariantKind: "departure",
      statement: "One page carries what a seat settles, and there is never a second.",
    },
    {
      invariantKind: "departure",
      statement: "A second page standing is read as neither of them holding.",
    },
    {
      invariantKind: "departure",
      statement: "A condition stated as `none` is read as unstated.",
    },
    {
      invariantKind: "departure",
      statement: "A condition nobody stated is that condition's default.",
    },
    {
      invariantKind: "gap",
      statement: "Every reader of these conditions reads them from akasha.",
    },
  ],
} as const satisfies PageType
