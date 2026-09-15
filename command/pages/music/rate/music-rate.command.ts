import type { Command } from "akasha/command/command.page-type.types.ts"

export const musicRate = {
  id: "01a062fb-d2fb-72a1-8169-279a6baf3d97",
  type: "page-type/command",
  slug: "music-rate",
  definition: "the command recording Alan's grade and what he said onto a song or an artist",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A prose flag said beside its file twin is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A grade already recorded is written over.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page is named by its slug.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A reaction is an artist's and insights and personal connections are a song's.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A grade is a rung on the ladder music grades pages by.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A call recording nothing is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Prose lands in a file beside the page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page is written through the change working out what kind of path it is.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The landing a page goes through is handed in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A property the call does not name is left as that property was.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reaches a music provider.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The page hands in the body it was composed from, and the prose beside it none.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run that wrote before it threw says in its refusal what that run had written.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A fault carries the code that fault names and says where it was thrown.",
    },
  ],
  name: "rate",
  arguments: [
    { argument: "argument/json" },
    { argument: "argument/slug", required: true },
    { argument: "argument/rating" },
    { argument: "argument/reaction-file" },
    { argument: "argument/personal-connections-file" },
    { argument: "argument/insights-file" },
    { argument: "argument/reaction", notWith: ["argument/reaction-file"] },
    { argument: "argument/personal-connections", notWith: ["argument/personal-connections-file"] },
    { argument: "argument/insights", notWith: ["argument/insights-file"] },
    { argument: "argument/grade-target", required: true },
  ],
} as const satisfies Command
