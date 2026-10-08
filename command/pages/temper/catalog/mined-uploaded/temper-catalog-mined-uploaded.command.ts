import type { Command } from "akasha/command/command.page-type.types.ts"

export const temperCatalogMinedUploaded = {
  id: "01a11d0f-0918-7132-ac72-7b2f7024f3c9",
  type: "page-type/command",
  slug: "temper-catalog-mined-uploaded",
  definition: "the command telling the catalog addon which mined items have landed in akasha",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A file the call does not name is read from the game's live install.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every mined item in the capture is looked for in akasha by its item id.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One mined item missing from akasha refuses the call and records nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Mining that is not complete refuses the call.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The record names the capture's game version and its highest mined item id.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The record is written into the side file beside the request the file carries.",
    },
  ],
  name: "mined-uploaded",
  arguments: [{ argument: "argument/side-file" }, { argument: "argument/saved-variables-file" }],
  createdAt: "2026-10-08T19:48:07.064Z",
  updatedAt: "2026-10-08T19:48:07.064Z",
} as const satisfies Command
