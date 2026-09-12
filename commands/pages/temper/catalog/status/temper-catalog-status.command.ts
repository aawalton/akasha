import type { Command } from "akasha/commands/command.page-type.types.ts"

export const temperCatalogStatus = {
  id: "01a0603c-c1cc-7a60-8387-08c112165535",
  type: "command",
  slug: "temper-catalog-status",
  definition:
    "the command saying which catalog domains are collected and which are owed a collection",
  code: "ts",
  taking: [
    {
      said: "--saved-variables-file <path>",
      takes: "the file the addon's collected data is read from",
    },
    {
      said: "--side-file <path>",
      takes: "the file the outstanding collection request is read from",
    },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A file the call does not name is read from the game's live install.",
    },
    {
      invariantKind: "departure",
      statement:
        "A domain not collected carries the reason the addon gave for skipping it, where it gave one.",
    },
    {
      invariantKind: "departure",
      statement: "Each account in the capture is reported over every domain the registry has.",
    },
    {
      invariantKind: "departure",
      statement:
        "A domain is owed a collection where the request is newer than the collection the account last saw.",
    },
    {
      invariantKind: "departure",
      statement: "A request naming no domain asks for every domain.",
    },
    {
      invariantKind: "departure",
      statement: "A missing file is read as no capture rather than refusing the call.",
    },
  ],
  name: "status",
  arguments: [{ argument: "argument/json" }],
} as const satisfies Command
