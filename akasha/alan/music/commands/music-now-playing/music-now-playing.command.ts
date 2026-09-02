import type { Command } from "@akasha/command-system/command"

export const musicNowPlaying = {
  id: "01a062f8-ead8-74de-aa60-befb47afaae9",
  pageTypeSlug: "command",
  slug: "music-now-playing",
  definition: "the command naming the track Spotify is playing and the playback state around it",
  code: "ts",
  test: "ts",
  changeKindSlug: "change-none",
  taking: [
    { said: "--json", takes: "give the playback state as JSON rather than as one human line" },
  ],
  helpNotes: [
    "the playback state and the currently playing track are read together, and the currently playing track wins.",
    "a workstation with no active device is answered with the no-device state rather than refused.",
  ],
  invariants: [
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
      statement: "Nothing here changes what is playing.",
    },
  ],
} as const satisfies Command
