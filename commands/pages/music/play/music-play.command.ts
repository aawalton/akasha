import type { Command } from "akasha/commands/command.page-type.types.ts"

export const musicPlay = {
  id: "01a062f9-5ca9-7fc5-acba-8d513404a6f9",
  type: "command",
  slug: "music-play",
  definition: "the command playing one track, named by a query or by a track uri",
  code: "ts",
  test: "ts",
  taking: [
    { said: "<query>", takes: "the track searched for, played as the top hit" },
    {
      said: "--uri <spotify:track:...>",
      takes: "play this exact track and search for nothing, naming no query",
    },
    { said: "--device-id <id>", takes: "the Spotify device played on, rather than the active one" },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Nothing playing already and no device to play on refuses the call.",
    },
    {
      invariantKind: "departure",
      statement: "A uri named plays that exact track and searches for nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A uri naming no track is played exactly as the uri was written.",
    },
    {
      invariantKind: "departure",
      statement: "A query named beside a uri refuses the call.",
    },
    {
      invariantKind: "departure",
      statement: "Neither a query nor a uri refuses the call.",
    },
    {
      invariantKind: "departure",
      statement: "A device named on the command line is played on rather than the active device.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes a page.",
    },
  ],
  name: "play",
  arguments: [{ argument: "argument/json" }, { argument: "argument/artist" }],
} as const satisfies Command
