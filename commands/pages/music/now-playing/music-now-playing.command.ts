import type { Command } from "akasha/commands/command.page-type.types.ts"

export const musicNowPlaying = {
  id: "01a062f8-ead8-74de-aa60-befb47afaae9",
  type: "command",
  slug: "music-now-playing",
  definition: "the command naming the track Spotify is playing and the playback state around it",
  code: "ts",
  test: "ts",
  taking: [
    { said: "--json", takes: "give the playback state as JSON rather than as one human line" },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The playback state and the currently playing track are read together.",
    },
    {
      invariantKind: "departure",
      statement: "The currently playing track wins over the track the playback state names.",
    },
    {
      invariantKind: "departure",
      statement: "No active device is a state rather than a refusal.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here changes the track playing.",
    },
  ],
  name: "now-playing",
  arguments: [{ argument: "argument/json" }],
} as const satisfies Command
