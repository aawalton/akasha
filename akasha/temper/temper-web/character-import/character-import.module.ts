import type { Module } from "@akasha/code-system/module"

export const characterImport = {
  id: "01a0640f-8510-7c04-b799-f12ba75125ab",
  pageTypeSlug: "module",
  slug: "character-import",
  definition: "a character build decoded from a hash and filed against the reader's account",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A reader who is not signed in imports nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A hash the codec will not decode is refused rather than part-imported.",
    },
    {
      invariantKind: "departure",
      statement: "A hash the reader already holds gives back the build already filed.",
    },
    {
      invariantKind: "departure",
      statement: "A build named against a game character is live.",
    },
    {
      invariantKind: "departure",
      statement: "A build named against no game character is private.",
    },
    {
      invariantKind: "departure",
      statement: "The build name is the race and the class rather than what the hash carried.",
    },
    {
      invariantKind: "departure",
      statement: "The cookies the sign-in set are carried onto the answer.",
    },
  ],
} as const satisfies Module
