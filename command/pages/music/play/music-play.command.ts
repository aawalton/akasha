import type { Command } from "akasha/command/command.page-type.types.ts"

export const musicPlay = {
  id: "01a062f9-5ca9-7fc5-acba-8d513404a6f9",
  type: "page-type/command",
  slug: "music-play",
  definition: "the command playing a track or a context, named by a query or by a uri",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Nothing playing already and no device to play on refuses the call.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A uri named plays that exact track and searches for nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A uri naming no track is played exactly as the uri was written.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A playlist uri, an album uri and an artist uri each name the context played.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every other uri names the track played.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A query named beside a uri refuses the call.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Neither a query nor a uri refuses the call.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An empty query or an empty uri is refused rather than acted on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A device named on the command line is played on rather than the active device.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A call that started playback and then refused says playback started.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A play Spotify took but answered badly is said here to have not started.",
    },
    {
      decisionKind: "decision-kind/absence",
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
