import type { DataTable } from "akasha/code/data-table/data-table.page-type.types.ts"

export const sandboxLibrary = {
  id: "01a0d8b3-a671-7b11-8a51-1b26ebc35e66", type: "page-type/data-table",
  slug: "sandbox-library",
  definition: "what the game's Lua sandbox leaves of Lua's standard library, as the game answered",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The table is written from the catalog add-on's capture rather than by hand.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each standard global is kept with the Lua type the game gave it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each standard library the game keeps is kept with its members' names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The API version the capture ran against is kept beside what the game left.",
    },
  ],
} as const satisfies DataTable
