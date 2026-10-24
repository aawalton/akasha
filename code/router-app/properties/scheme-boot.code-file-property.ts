import type { CodeFileProperty } from "akasha/page/code-file-property/code-file-property.page-type.types.ts"

export const schemeBoot = {
  id: "01a16f79-581f-7591-a124-7a4c95f84aeb",
  type: "page-type/code-file-property",
  slug: "scheme-boot",
  propertySlug: "scheme-boot",
  definition: "what sets the color scheme a reader chose before the page first paints",
  extensions: ["js"],
  fileName: "public/scheme-boot.js",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A reader who chose no scheme is shown the dark scheme.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reader who chose the system scheme is shown the scheme the device prefers.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The scheme follows the device as the device changes, while the page is open.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The scheme boot reads the choice the server wrote on the root.",
    },
  ],
  types: "ts",
  createdAt: "2026-10-24T19:53:05.822Z",
  updatedAt: "2026-10-24T21:28:38.090Z",
} as const satisfies CodeFileProperty
