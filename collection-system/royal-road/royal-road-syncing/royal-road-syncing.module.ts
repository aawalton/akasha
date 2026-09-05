import type { Module } from "@akasha/code-system/module"

export const royalRoadSyncing = {
  id: "01a0686a-7a57-7b85-b362-7a71277ca88c",
  pageTypeSlug: "module",
  slug: "royal-road-syncing",
  definition: "every chapter royal road lists for a story read and filed under that story",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A story is followed by the royal road id the story states.",
    },
    {
      invariantKind: "absence",
      statement: "No story page is created here.",
    },
    {
      invariantKind: "departure",
      statement: "A chapter already held is known by its royal road id rather than by its title.",
    },
    {
      invariantKind: "departure",
      statement: "A chapter stating no royal road id is known by the id its link carries.",
    },
    {
      invariantKind: "departure",
      statement: "A chapter already filed is read whatever source that chapter states.",
    },
    {
      invariantKind: "departure",
      statement: "A chapter royal road hides or keeps locked is left where it is.",
    },
    {
      invariantKind: "departure",
      statement:
        "A chapter's name opens with its story's slug, then its position padded to four digits, then its title cut back to whole words at fifty characters.",
    },
    {
      invariantKind: "departure",
      statement:
        "A name is cut back further where it would otherwise run past the hundred characters a slug holds.",
    },
    {
      invariantKind: "departure",
      statement:
        "A name another chapter already holds takes the chapter's royal road id on the end.",
    },
    {
      invariantKind: "departure",
      statement:
        "A chapter names the story it is part of by page type and slug rather than by slug alone.",
    },
    {
      invariantKind: "departure",
      statement:
        "A story's status is restated from royal road only where royal road says ongoing, completed or hiatus.",
    },
    {
      invariantKind: "departure",
      statement: "A story naming no world is left unrestated and said to be.",
    },
    {
      invariantKind: "departure",
      statement: "A second and a half sits between one request to royal road and the next.",
    },
    {
      invariantKind: "departure",
      statement:
        "What is composed is shown rather than landed unless the run was asked to commit it.",
    },
    {
      invariantKind: "departure",
      statement:
        "Pages land fifty at a time, each fifty its own commit, every page with the files beside it.",
    },
    {
      invariantKind: "departure",
      statement:
        "A chapter refused for holding no prose is named by the page read and by which refusal it hit.",
    },
    {
      invariantKind: "departure",
      statement: "A run that failed a chapter is a failed run however much else it composed.",
    },
  ],
} as const satisfies Module
