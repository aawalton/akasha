import type { Command } from "akasha/command/command.page-type.types.ts"

export const temperCatalogStatus = {
  id: "01a0603c-c1cc-7a60-8387-08c112165535",
  type: "command",
  slug: "temper-catalog-status",
  definition:
    "the command saying which catalog domains are collected and which are owed a collection",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file the call does not name is read from the game's live install.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A domain not collected carries the reason the addon gave for skipping it, where it gave one.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Each account in the capture is reported over every domain the registry has.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A domain is owed a collection where the request is newer than the collection the account last saw.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A request naming no domain asks for every domain.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A missing file is read as no capture rather than refusing the call.",
    },
  ],
  name: "status",
  arguments: [
    { argument: "argument/json" },
    { argument: "argument/side-file" },
    { argument: "argument/saved-variables-file" },
  ],
} as const satisfies Command
