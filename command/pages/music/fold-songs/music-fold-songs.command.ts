import type { Command } from "akasha/command/command.page-type.types.ts"

export const musicFoldSongs = {
  id: "01a0b7c9-4e11-7a26-9f03-8b41d0e5c772",
  type: "page-type/command",
  slug: "music-fold-songs",
  definition: "the command leaving one page for a composition, under every artist performing it",
  code: "ts",
  test: "ts",
  maxWallSeconds: 600,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Songs of one artist reducing to one composition are one song.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Songs holding one MusicBrainz work are one song whoever performs them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The page a person has written on is the page that stays.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Where no page is written on, a page whose artist is named a writer stays.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Where no page names its artist a writer, a page titled the composition stays.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The page that stays is part of every artist the pages that go were under.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The shortest slug settles which of those stays.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every track naming a page that goes names the page that stays.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A group written on in more than one place is left alone and said aloud.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reaches Spotify or MusicBrainz.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here carries a value from a page that goes onto the page that stays.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every page and track changed lands as a single commit or does not land.",
    },
  ],
  name: "fold-songs",
  arguments: [{ argument: "argument/json" }],
} as const satisfies Command
