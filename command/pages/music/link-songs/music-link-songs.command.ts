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
      statement: "A track matching no song is counted and left as that track is.",
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
      statement: "Nothing here writes a song.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A release filed under a collection that is no artist names no artist.",
    },
  ],
  name: "link-songs",
  arguments: [{ argument: "argument/json" }, { argument: "argument/dry-run" }],
} as const satisfies Command
