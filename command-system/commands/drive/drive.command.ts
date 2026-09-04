import type { Command } from "../command.page-type.ts"

export const drive = {
  id: "01a06809-e6ee-78ea-b3d7-34282c2848ae",
  pageTypeSlug: "command",
  slug: "drive",
  definition: "the command acting on the files standing in Alan's Google Drive",
  code: "ts",
  test: "ts",
  changeKindSlug: "change-mechanical",
  taking: [
    { said: "auth", takes: "what to act on, which is the consent Drive is reached as Alan on" },
    {
      said: "login",
      takes: "the act, which is to grant that consent once and mint a refresh token",
    },
    {
      said: "--callback-url <url>",
      takes:
        "the callback URL pasted from the browser, where the loopback listener cannot be reached",
    },
    {
      said: "fetch",
      takes: "the act, which is to write one Drive file to disk under its Drive name",
    },
    { said: "<url-or-id>", takes: "the file to fetch, said in place as a share URL or a bare id" },
    {
      said: "--source <url-or-id>",
      takes: "the file to fetch, said as a flag rather than in place",
    },
    { said: "--out <dir>", takes: "the folder to write into, made where it stands at nothing" },
  ],
  helpNotes: [
    "the words stand in order, and one call names one act.",
    "the file is named in place after the act or as a flag, and naming it both ways over is refused.",
    "every Drive URL shape is read for the id it carries, and a bare id is taken as it stands.",
    "the name the file lands under on disk is the name Drive holds for it.",
    "a folder named here is read against the repository root, and naming none writes into the folder the call came from.",
    "a Docs, Sheets or Slides file holds no bytes to download and is refused rather than exported.",
    "the consent a fetch leans on is granted once by the login act, and it reaches Drive read-only.",
    "the minted refresh token is written to stdout by the consent round trip rather than answered here.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The first word is the act, and only the consent takes a second word.",
    },
    {
      invariantKind: "departure",
      statement: "A file is named in place or as a flag rather than as both.",
    },
    {
      invariantKind: "departure",
      statement: "A share URL and a bare id name the same file.",
    },
    {
      invariantKind: "departure",
      statement: "The name a fetched file lands under is the name Drive holds for it.",
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
      statement: "A folder standing at nothing is made before the file is written.",
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
      invariantKind: "departure",
      statement: "A minted refresh token is written out and held nowhere.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes to Drive.",
    },
  ],
} as const satisfies Command
