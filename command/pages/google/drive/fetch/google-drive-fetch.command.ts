import type { Command } from "akasha/command/command.page-type.types.ts"

export const googleDriveFetch = {
  id: "01a08cdb-485a-7511-90c8-8b12ad2e1662",
  type: "command",
  slug: "google-drive-fetch",
  definition:
    "the command writing one file out of Alan's Google Drive to disk under its Drive name",
  code: "ts",
  test: "ts",

  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file named in place and as a flag is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A share URL and a bare id name the same file.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The name a fetched file lands under is the name Drive holds for that file.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A call naming no folder writes into the folder the call came from.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A folder that is not there is made before the file is written.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A write that throws after the folder was made names that folder in its refusal.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A folder that was already there is named nowhere, because nothing made it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A refusal naming the folder it made keeps the kind of thing that went wrong.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file in a native Google format is refused as the caller's mistake.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file this consent cannot reach is answered as the data rather than as a fault.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Drive turning the consent away is answered as operational.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A Drive name that cannot be written to disk is answered as operational.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here writes to Drive.",
    },
  ],
  name: "fetch",
  arguments: [
    { argument: "argument/output" },
    { argument: "argument/drive-file", required: true, saidAs: "flag-or-word" },
  ],
} as const satisfies Command
