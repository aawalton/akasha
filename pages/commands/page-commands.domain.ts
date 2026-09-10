import type { Domain } from "../../domains/domain.page-type.types.ts"

export const pageCommands = {
  id: "01a06812-3ce8-79c7-b7c0-ca183f330ca5",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "page-commands",
  definition: "what an agent runs by name over the pages themselves",
  parts: ["module/icon-index-rendering", "module/page-secret-acting"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A command here is named for the path the old ops command was reached by.",
    },
    {
      invariantKind: "departure",
      statement: "A command here acts on a page's files rather than on the values a page states.",
    },
  ],
} as const satisfies Domain
