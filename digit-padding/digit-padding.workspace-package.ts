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
      statement: "Nothing here knows what the number this package fills out counts.",
    },
    {
      invariantKind: "departure",
      statement: "The width counts every character a number is written with.",
    },
  ],
} as const satisfies WorkspacePackage
