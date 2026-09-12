import type { Command } from "akasha/commands/command.page-type.types.ts"

export const icloudFetch = {
  id: "01a08cf8-d3c1-744e-a8e9-70301b272c28",
  type: "command",
  slug: "icloud-fetch",
  definition: "the command writing every photo an iCloud shared album holds to disk",
  code: "ts",
  test: "ts",
  taking: [
    { said: "<share-url>", takes: "the album to fetch, said in place as its share URL" },
    { said: "--url <share-url>", takes: "the album to fetch, said as a flag rather than in place" },
    {
      said: "--json",
      takes: "report each written path as a JSON object rather than as a path alone",
    },
  ],

  invariants: [
    {
      invariantKind: "departure",
      statement: "An album named in place and as a flag is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A URL that is no iCloud share is the caller's mistake.",
    },
    {
      invariantKind: "departure",
      statement: "The share link alone reaches the album.",
    },
    {
      invariantKind: "departure",
      statement: "Every photo the album has is written rather than the first page alone.",
    },
    {
      invariantKind: "departure",
      statement: "A photo is written as the original resource is stored.",
    },
    {
      invariantKind: "departure",
      statement: "Two photos with one name land under names told apart.",
    },
    {
      invariantKind: "departure",
      statement: "A call naming no folder writes into the folder the call came from.",
    },
    {
      invariantKind: "departure",
      statement: "A folder nothing is at is made before a photo is written.",
    },
    {
      invariantKind: "departure",
      statement: "An album with no photo is answered as the data.",
    },
    {
      invariantKind: "departure",
      statement: "A response iCloud could not be read from is answered as operational.",
    },
    {
      invariantKind: "departure",
      statement: "Each photo is named as soon as that photo reaches the disk.",
    },
    {
      invariantKind: "departure",
      statement: "A call that threw part way names those photos in its refusal.",
    },
    {
      invariantKind: "departure",
      statement: "The downloading this runs is handed in.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here has an Apple credential.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes to the album.",
    },
  ],
  name: "fetch",
  arguments: [{ argument: "argument/output" }],
} as const satisfies Command
