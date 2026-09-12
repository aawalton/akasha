import type { Command } from "akasha/commands/command.page-type.types.ts"

export const googleDriveFetch = {
  id: "01a08cdb-485a-7511-90c8-8b12ad2e1662",
  type: "command",
  slug: "google-drive-fetch",
  definition:
    "the command writing one file out of Alan's Google Drive to disk under its Drive name",
  code: "ts",
  test: "ts",
  taking: [],

  invariants: [
    {
      invariantKind: "departure",
      statement: "A file named in place and as a flag is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A share URL and a bare id name the same file.",
    },
    {
      invariantKind: "departure",
      statement: "The name a fetched file lands under is the name Drive holds for that file.",
    },
    {
      invariantKind: "departure",
      statement: "A call naming no folder writes into the folder the call came from.",
    },
    {
      invariantKind: "departure",
      statement: "A folder that is not there is made before the file is written.",
    },
    {
      invariantKind: "departure",
      statement: "A file in a native Google format is refused as the caller's mistake.",
    },
    {
      invariantKind: "departure",
      statement: "A file this consent cannot reach is answered as the data rather than as a fault.",
    },
    {
      invariantKind: "departure",
      statement: "Drive turning the consent away is answered as operational.",
    },
    {
      invariantKind: "departure",
      statement: "A Drive name that cannot be written to disk is answered as operational.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes to Drive.",
    },
  ],
  name: "fetch",
  arguments: [
    { argument: "argument/output" },
    { argument: "argument/drive-file", required: true, saidAs: "flag-or-word" },
  ],
} as const satisfies Command
