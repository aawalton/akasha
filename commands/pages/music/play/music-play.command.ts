import type { Command } from "akasha/commands/command.page-type.types.ts"

export const musicPlay = {
  id: "01a062f9-5ca9-7fc5-acba-8d513404a6f9",
  type: "command",
  slug: "music-play",
  definition: "the command playing one track, named by a query or by a track uri",
  code: "ts",
  test: "ts",
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
      statement: "An empty query or an empty uri is refused rather than acted on.",
    },
    {
      invariantKind: "departure",
      statement: "A device named on the command line is played on rather than the active device.",
    },
    {
      invariantKind: "departure",
      statement: "A call that started playback and then refused says playback started.",
    },
    {
      invariantKind: "gap",
      statement: "A play Spotify took but answered badly is said here to have not started.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes a page.",
    },
  ],
  name: "play",
  arguments: [
    { argument: "argument/json" },
    { argument: "argument/artist" },
    { argument: "argument/device-id" },
    { argument: "argument/uri", notWith: ["argument/artist"], oneOf: ["argument/query"] },
    {
      argument: "argument/query",
      saidAs: "word",
      notWith: ["argument/uri"],
      oneOf: ["argument/uri"],
    },
  ],
} as const satisfies Command
