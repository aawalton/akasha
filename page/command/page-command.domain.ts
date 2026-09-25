import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const pageCommand = {
  id: "01a06812-3ce8-79c7-b7c0-ca183f330ca5",
  type: "page-type/domain",
  slug: "page-command",
  definition: "the commands an agent runs on pages",
  parts: ["module/icon-index-rendering", "module/page-secret-acting"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A command here is named for the path the old ops command was reached by.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A command here acts on a page's files rather than on the values a page states.",
    },
  ],
} as const satisfies Domain
