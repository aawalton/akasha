import type { IosComponent } from "../../ios-component.page-type.ts"

export const alanwaltonRefusedView = {
  id: "01a05835-69dc-7549-9bd0-f60662e9fff3",
  pageTypeSlug: "ios-component",
  type: "ios-component",
  slug: "alanwalton-refused-view",
  definition: "the drawing standing in for a feed that refused the credential",
  swift: "swift",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The tile names why the credential was refused rather than only that it was.",
    },
  ],
} as const satisfies IosComponent
