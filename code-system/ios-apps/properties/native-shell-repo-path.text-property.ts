import type { TextProperty } from "@akasha/pages-system/text-property"

export type NativeShellRepoPath = string

export const nativeShellRepoPath = {
  id: "01a068c9-394b-7ab1-bae3-1499a45430c5",
  pageTypeSlug: "text-property",
  slug: "native-shell-repo-path",
  propertySlug: "native-shell-repo-path",
  definition: "where the native shell an app is compiled from is kept",
  max: 200,
  nameFormatSlug: null,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A path carrying no colon names the code repository.",
    },
  ],
} as const satisfies TextProperty
