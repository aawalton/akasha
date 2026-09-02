import type { Command } from "@akasha/command-system/command"

export const temperCatalogStatus = {
  id: "01a0603c-c1cc-7a60-8387-08c112165535",
  pageTypeSlug: "command",
  slug: "temper-catalog-status",
  definition:
    "the command saying which catalog domains are collected and which are owed a collection",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [
    {
      said: "--saved-variables-file <path>",
      takes: "the file the addon's collected data is read from",
    },
    {
      said: "--side-file <path>",
      takes: "the file the outstanding collection request is read from",
    },
    {
      said: "--json",
      takes: "give the state as JSON rather than as tab-separated rows and a summary",
    },
  ],
  helpNotes: [
    "both files default to the workstation's live game install.",
    "each account in the capture is reported over every domain the registry holds.",
    "a domain the capture is missing carries the reason the addon gave for skipping it, where it gave one.",
    "a request naming no domain is read as one asking for every domain.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Each account in the capture is reported over every domain the registry holds.",
    },
    {
      invariantKind: "departure",
      statement:
        "A domain is owed a collection where the request is newer than what the account last saw.",
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
} as const satisfies Command
