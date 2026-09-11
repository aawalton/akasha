import type { TextProperty } from "akasha/pages/text-properties/text-property.page-type.types.ts"

export const deployedCommit = {
  id: "01a09189-f956-77a0-ba59-fe66d243fae8",
  type: "text-property",
  slug: "deployed-commit",
  propertySlug: "deployed-commit",
  definition: "the commit the last deploy that finished put up",
  maxLength: 40,
  nameFormat: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The commit is the whole hash git resolved rather than the name a call gave.",
    },
    {
      invariantKind: "departure",
      statement: "A service nothing has put up yet states no commit.",
    },
    {
      invariantKind: "departure",
      statement: "A deploy that refused leaves the commit as that commit was.",
    },
    {
      invariantKind: "departure",
      statement: "A dry run leaves the commit as that commit was.",
    },
    {
      invariantKind: "departure",
      statement: "What a deploy is judged against is the diff between this commit and the new one.",
    },
    {
      invariantKind: "departure",
      statement: "The commit is kept uncommitted, so no deploy's closure reaches it.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
