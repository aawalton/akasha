import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const googleSheets = {
  id: "01a13ab0-c505-7a71-865d-d053e4c2078b",
  type: "page-type/domain",
  slug: "google-sheets",
  definition: "the spreadsheets Alan keeps with Google",
  parts: ["module/sheets-address", "module/sheets-client", "module/sheets-credentials"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A sheet is reached over its REST API through the OAuth client Drive's package carries.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Cells are written as a person typing them would write them.",
    },
  ],
  createdAt: "2026-10-14T13:53:45.733Z",
  updatedAt: "2026-10-14T13:53:45.733Z",
} as const satisfies Domain
