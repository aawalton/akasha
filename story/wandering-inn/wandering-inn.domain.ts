import type { Domain } from "../../domains/domain.page-type.ts"

export const wanderingInn = {
  id: "01a06578-5721-7000-ac18-7acf6bd4ad0b",
  pageTypeSlug: "domain",
  slug: "wandering-inn",
  definition: "The Wandering Inn as a website read for its chapters",
  partSlugs: [
    "module/chapter",
    "module/chapter-filing",
    "module/site",
    "module/sync-run-recording",
    "module/syncing",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A chapter behind patron early access is known by the chapter's title.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes to the site.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches the page store over the network.",
    },
  ],
} as const satisfies Domain
