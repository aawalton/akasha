import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const nativeShellRepoPath = {
  id: "01a068c9-394b-7ab1-bae3-1499a45430c5",
  type: "page-type/text-property",
  slug: "native-shell-repo-path",
  propertySlug: "native-shell-repo-path",
  definition: "where the native shell an app is compiled from is kept",
  maxLength: 200,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A path carrying no colon names the code repository.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-03T19:40:13.003Z",
  updatedAt: "2026-09-15T17:36:15.000Z",
} as const satisfies TextProperty
