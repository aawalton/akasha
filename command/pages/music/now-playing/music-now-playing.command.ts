import type { Command } from "akasha/command/command.page-type.types.ts"

export const musicNowPlaying = {
  id: "01a062f8-ead8-74de-aa60-befb47afaae9",
  type: "command",
  slug: "music-now-playing",
  definition: "the command naming the track Spotify is playing and the playback state around it",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The playback state and the currently playing track are read together.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The currently playing track wins over the track the playback state names.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "No active device is a state rather than a refusal.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A call saying `--json` is answered one line of JSON, and one saying nothing words.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "That JSON is compact on the one line rather than indented over many.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here changes the track playing.",
    },
  ],
  name: "now-playing",
  arguments: [{ argument: "argument/json" }],
} as const satisfies Command
