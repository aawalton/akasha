import type { Command } from "akasha/command/command.page-type.types.ts"

export const icloudFetch = {
  id: "01a08cf8-d3c1-744e-a8e9-70301b272c28",
  type: "command",
  slug: "icloud-fetch",
  definition: "the command writing every photo an iCloud shared album holds to disk",
  code: "ts",
  test: "ts",

  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "An album named in place and as a flag is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A URL that is no iCloud share is the caller's mistake.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The share link alone reaches the album.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every photo the album has is written rather than the first page alone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A photo is written as the original resource is stored.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Two photos with one name land under names told apart.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A call naming no folder writes into the folder the call came from.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A folder nothing is at is made before a photo is written.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An album with no photo is answered as the data.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A response iCloud could not be read from is answered as operational.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Each photo is named as soon as that photo reaches the disk.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A call that threw part way names those photos in its refusal.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The downloading this runs is handed in.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here has an Apple credential.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here writes to the album.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A JSON answer here is one object a written path rather than one document.",
    },
  ],
  name: "fetch",
  arguments: [
    { argument: "argument/output" },
    { argument: "argument/album", required: true, saidAs: "flag-or-word" },
    { argument: "argument/json" },
  ],
} as const satisfies Command
