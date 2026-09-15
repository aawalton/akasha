import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const browserCommand = {
  id: "01a06862-06c8-7000-8f27-5543118e4614",
  type: "page-type/domain",
  slug: "browser-command",
  definition: "what an agent runs by name over a site it drives a browser against",
  parts: ["module/verify-render-plan"],
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A command here is named for the path the old ops command was reached by.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A command here drives the harness rather than launching a browser of its own.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The user a command here signs in as is checked against the protected user.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here knows the purpose of any page this package looks at.",
    },
  ],
} as const satisfies Domain
