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
      invariantKind: "departure",
      statement: "A chapter already held is known by its royal road id rather than by its title.",
    },
    {
      invariantKind: "departure",
      statement: "A chapter royal road hides or keeps locked is left where it stands.",
    },
    {
      invariantKind: "departure",
      statement:
        "A chapter's name is its position padded to four digits joined to its title cut back to whole words at fifty characters.",
    },
    {
      invariantKind: "departure",
      statement: "A name a sibling already holds takes the chapter's royal road id on the end.",
    },
    {
      invariantKind: "departure",
      statement:
        "A story's status is restated from royal road only where royal road says ongoing, completed or hiatus.",
    },
    {
      invariantKind: "departure",
      statement: "A second and a half stands between one request to royal road and the next.",
    },
    {
      invariantKind: "departure",
      statement:
        "What is composed is shown rather than landed unless the run was asked to commit it.",
    },
    {
      invariantKind: "departure",
      statement: "Files land fifty at a time, each fifty its own commit.",
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
    {
      invariantKind: "gap",
      statement:
        "Stories are read from the store the stories now stand in, which is `story/stories-read/pages` rather than `pages/story-read-royal-road`.",
    },
    {
      invariantKind: "gap",
      statement:
        "Chapters are filed into the store the chapters now stand in, which is `story/story-chapters-read/pages` rather than `pages/story-chapter-royal-road`.",
    },
  ],
} as const satisfies Module
