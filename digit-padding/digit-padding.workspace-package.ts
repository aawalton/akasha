import type { WorkspacePackage } from "../code-system/workspace-packages/workspace-package.page-type.ts"

export const digitPadding = {
  id: "01a05c8b-6039-77c9-8131-222d1705c4c3",
  pageTypeSlug: "workspace-package",
  slug: "digit-padding",
  definition: "how a number too short is filled out with leading zeros",
  manifest: "json",
  partSlugs: ["module/pad-two"],
  invariants: [
    {
      invariantKind: "absence",
      statement: "Nothing here knows the thing the number this package fills out counts.",
    },
    {
      invariantKind: "departure",
      statement: "The width counts every character a number is written with.",
    },
    {
      invariantKind: "departure",
      statement: "The width is a contract rather than a courtesy.",
    },
    {
      invariantKind: "departure",
      statement: "A shorter answer breaks a caller that parses back the answer this writes.",
    },
  ],
} as const satisfies WorkspacePackage
