import type { Command } from "akasha/command/command.page-type.types.ts"

export const musicLinkSongs = {
  id: "01a0b732-4a33-7079-972f-39fd807b0c72",
  type: "page-type/command",
  slug: "music-link-songs",
  definition: "the command naming on every track the song that track is a recording of",
  code: "ts",
  test: "ts",
  maxWallSeconds: 600,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every track filed is read, not only the tracks a sweep files.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A track is matched under the artist the release carrying it names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A track already naming the song matched is left as that track is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A track naming a song no longer matched gives that song up.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A track whose song cannot be filed is counted and left as that track is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every track changed lands as a single commit or does not land.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reaches Spotify or MusicBrainz.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement:
        "A track whose release names no artist is filed under the artist Spotify credits on it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A track matching no song has that song filed and then names it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A run stopped at its limit reports the tracks that run read rather than every track filed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A track Spotify credits to several artists is filed under the first of them.",
    },
  ],
  name: "link-songs",
  arguments: [
    { argument: "argument/json" },
    { argument: "argument/dry-run" },
    { argument: "argument/track-limit" },
  ],
} as const satisfies Command
