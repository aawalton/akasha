import type { Command } from "../../command-system/commands/command.page-type.ts"

export const icloud = {
  id: "01a06809-e6ee-767a-a4ca-40bb4b0c44c0",
  pageTypeSlug: "command",
  slug: "icloud",
  definition: "the command acting on the photos an iCloud shared album holds",
  code: "ts",
  test: "ts",
  changeKindSlug: "change-mechanical",
  taking: [
    { said: "fetch", takes: "the act, which is to write every photo in an album to disk" },
    { said: "<share-url>", takes: "the album to fetch, said in place as its share URL" },
    { said: "--url <share-url>", takes: "the album to fetch, said as a flag rather than in place" },
    { said: "--out <dir>", takes: "the folder to write into, made where it stands at nothing" },
    {
      said: "--json",
      takes: "report each written path as a JSON object rather than as a path alone",
    },
  ],
  helpNotes: [
    "the album is named in place after the act or as a flag, and naming it both ways over is refused.",
    "the share link alone reaches the album, so no Apple account and no credential is asked for.",
    "the album is walked a page at a time until no photo is left, and every original resource is written as it is stored.",
    "two photos of one name land under names told apart rather than one written over the other.",
    "a folder named here is read against the repository root, and naming none writes into the folder the call came from.",
    "an album holding no photo is answered as the data rather than as an empty run.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The first word is the act.",
    },
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
      statement: "The share link is the whole of what reaches the album.",
    },
    {
      invariantKind: "departure",
      statement: "Every photo the album holds is written rather than the first page alone.",
    },
    {
      invariantKind: "departure",
      statement: "A photo is written as the original resource is stored.",
    },
    {
      invariantKind: "departure",
      statement: "Two photos carrying one name land under names told apart.",
    },
    {
      invariantKind: "departure",
      statement: "A folder the call names is read against the repository root.",
    },
    {
      invariantKind: "departure",
      statement: "A call naming no folder writes into the folder the call came from.",
    },
    {
      invariantKind: "departure",
      statement: "A folder standing at nothing is made before a photo is written.",
    },
    {
      invariantKind: "departure",
      statement: "An album holding no photo is answered as the data.",
    },
    {
      invariantKind: "departure",
      statement: "A response iCloud could not be read from is answered as operational.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here holds an Apple credential.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes to the album.",
    },
  ],
} as const satisfies Command
