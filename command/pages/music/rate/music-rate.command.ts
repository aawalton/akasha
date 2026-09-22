import type { Command } from "akasha/command/command.page-type.types.ts"

export const musicRate = {
  id: "01a062fb-d2fb-72a1-8169-279a6baf3d97",
  type: "page-type/command",
  slug: "music-rate",
  definition: "the command recording Alan's grade and what he said onto a music page",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  parts: ["module/track-naming"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A prose flag said beside its file twin is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A grade already recorded is written over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tag is added to the tags a page carries rather than written over them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tag already carried is left where it is rather than carried twice.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page is named by its slug.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A release is graded as a track and an artist are.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A grade named for a song is refused, because Alan grades the recording he heard.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A call names a page by its slug, or says to grade what Spotify is playing or played last.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What Spotify names is a track, so such a call names no target.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A reaction is an artist's, insights and personal connections are a song's, and a track's is none.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A grade is a rung on the ladder music grades pages by.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A call recording nothing is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Prose lands in a file beside the page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page is written through the change working out what kind of path it is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The landing a page goes through is handed in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A property the call does not name is left as that property was.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement:
        "Nothing here reaches a music provider but the reads of what is playing and what played last.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The page hands in the body it was composed from, and the prose beside it none.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run that wrote before it threw says in its refusal what that run had written.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A fault carries the code that fault names and says where it was thrown.",
    },
  ],
  name: "rate",
  arguments: [
    { argument: "argument/json" },
    {
      argument: "argument/slug",
      notWith: ["argument/now-playing", "argument/just-played"],
      oneOf: ["argument/now-playing", "argument/just-played"],
    },
    {
      argument: "argument/now-playing",
      notWith: ["argument/slug", "argument/just-played"],
      oneOf: ["argument/slug", "argument/just-played"],
    },
    {
      argument: "argument/just-played",
      notWith: ["argument/slug", "argument/now-playing"],
      oneOf: ["argument/slug", "argument/now-playing"],
    },
    { argument: "argument/grade" },
    { argument: "argument/tag", repeats: true },
    { argument: "argument/reaction-file" },
    { argument: "argument/personal-connections-file" },
    { argument: "argument/insights-file" },
    { argument: "argument/reaction", notWith: ["argument/reaction-file"] },
    { argument: "argument/personal-connections", notWith: ["argument/personal-connections-file"] },
    { argument: "argument/insights", notWith: ["argument/insights-file"] },
    {
      argument: "argument/grade-target",
      notWith: ["argument/now-playing", "argument/just-played"],
    },
  ],
} as const satisfies Command
