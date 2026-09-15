import type { Command } from "akasha/command/command.page-type.types.ts"

export const temperEsoGenerateBaseGameGlobal = {
  id: "01a0685d-f8fa-7913-8b39-8d1f9f835d34",
  type: "page-type/command",
  slug: "temper-eso-generate-base-game-global",
  definition: "the command staging the census of the string ids the base game provides",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A run's ordinal carries at least two digits and as many as the count of runs needs.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here writes the domain page's part slugs.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A string id is found by mention as well as by assignment.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Only the string ids cross into the census.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The census is written as numbered runs with an aggregate composing those runs.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run whose body is already there is not staged again.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A clone with no string id refuses the call.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing lands here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The writing call that lands the staged bodies is named instead.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here writes the clone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The staging folder is named as soon as this made it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Each body staged is named as soon as that body is written.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run that threw part way names in its refusal what it had staged.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The staging is handed in.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "The run count and the domain page's part slugs are written together.",
    },
  ],
  name: "base-game-global",
  arguments: [
    { argument: "argument/code-root" },
    { argument: "argument/stage" },
    { argument: "argument/eso-root" },
  ],
} as const satisfies Command
