import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const browserCommand = {
  id: "01a06862-06c8-7000-8f27-5543118e4614",
  type: "page-type/domain",
  slug: "browser-command",
  definition: "the commands an agent runs through a browser",
  parts: ["module/verify-render-plan"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A command here is named for the path the old ops command was reached by.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A command here drives the harness rather than launching a browser of its own.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here signs anybody in.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here knows the purpose of any page this package looks at.",
    },
  ],
} as const satisfies Domain
