import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const deployedCommit = {
  id: "01a09189-f956-77a0-ba59-fe66d243fae8",
  type: "page-type/text-property",
  slug: "deployed-commit",
  propertySlug: "deployed-commit",
  definition: "the commit the last deploy that finished put up",
  maxLength: 40,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The commit is the whole hash git resolved rather than the name a call gave.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A service nothing has put up yet states no commit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A deploy that refused leaves the commit as that commit was.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What a deploy is judged against is the diff between this commit and the new one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The commit is kept uncommitted, so no deploy's closure reaches it.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
