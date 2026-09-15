import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const wanderingInn = {
  id: "01a06578-5721-7000-ac18-7acf6bd4ad0b",
  type: "domain",
  slug: "wandering-inn",
  definition: "The Wandering Inn as a website read for its chapters",
  parts: [
    "module/chapter",
    "module/chapter-filing",
    "module/site",
    "module/sync-run-recording",
    "module/syncing",
    "service-workstation/wandering-inn-sync",
  ],
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A chapter behind patron early access is known by the chapter's title.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here writes to the site.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reaches the page store over the network.",
    },
  ],
} as const satisfies Domain
