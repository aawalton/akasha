import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const gitStoreSweeping = {
  id: "01a091c7-3c36-724a-a2ce-575287558db5",
  type: "page-type/module",
  slug: "git-store-sweeping",
  definition: "what akasha left under the folder git does not track, taken away",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The reach is the paths `git-place` says akasha keeps no longer.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path is read against the folder git keeps the checkout in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path nothing is at is passed over rather than reported as taken.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path is taken with everything under it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What would be taken is answered apart from the taking.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path that will not go is reported against that path.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every path is acted on rather than the run ending at the first that refuses.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No page is read here.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing a name akasha keeps holds is taken.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing git keeps is reached.",
    },
  ],
} as const satisfies Module
