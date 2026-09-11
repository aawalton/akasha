import type { Command } from "akasha/commands/command.page-type.types.ts"

export const googleDriveFetch = {
  id: "01a08cdb-485a-7511-90c8-8b12ad2e1662",
  type: "command",
  slug: "google-drive-fetch",
  definition: "one file written out of Alan's Google Drive to disk under its Drive name",
  code: "ts",
  test: "ts",
  changeKind: "change-mechanical",
  taking: [
    { said: "<url-or-id>", takes: "the file to fetch, said in place as a share URL or a bare id" },
    {
      said: "--source <url-or-id>",
      takes: "the file to fetch, said as a flag rather than in place",
    },
    { said: "--out <dir>", takes: "the folder to write into, made where nothing is there" },
  ],
  helpNotes: [
    "the file is named in place or as a flag, and naming it both ways over is refused.",
    "every Drive URL shape is read for the id it carries, and a bare id is taken as it is.",
    "the name the file lands under on disk is the name Drive holds for it.",
    "a folder named here is read against the repository root, and naming none writes into the folder the call came from.",
    "a Docs, Sheets or Slides file holds no bytes to download and is refused rather than exported.",
    "the consent this leans on is granted by `akasha google auth login`, and it reaches Drive read-only.",
  ],
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
} as const satisfies Command
