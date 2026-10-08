import type { IosComponent } from "akasha/code/ios-component/ios-component.page-type.types.ts"

export const alanwaltonRefusedView = {
  id: "01a05835-69dc-7549-9bd0-f60662e9fff3",
  type: "page-type/ios-component",
  slug: "alanwalton-refused-view",
  definition: "the drawing standing in for a feed that refused the credential",
  swift: "swift",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The tile names why the credential was refused rather than only that the credential was refused.",
    },
  ],
  createdAt: "2026-08-31T14:24:50.652Z",
  updatedAt: "2026-09-15T17:36:15.000Z",
} as const satisfies IosComponent
