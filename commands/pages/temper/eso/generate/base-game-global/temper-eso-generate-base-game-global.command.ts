import type { Command } from "akasha/commands/command.page-type.types.ts"

export const temperEsoGenerateBaseGameGlobal = {
  id: "01a0685d-f8fa-7913-8b39-8d1f9f835d34",
  type: "command",
  slug: "temper-eso-generate-base-game-global",
  definition: "the command staging the census of the string ids the base game provides",
  code: "ts",
  taking: [
    {
      said: "--eso-root <path>",
      takes: "the game's Lua source root, the `~/esoui` clone where none is said",
    },
    {
      said: "--stage <path>",
      takes:
        "the directory the bodies are staged in, a fresh one under /var/tmp where none is said",
    },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A run's ordinal carries at least two digits and as many as the count of runs needs.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes the workspace-package page's part slugs.",
    },
    {
      invariantKind: "departure",
      statement: "A string id is found by mention as well as by assignment.",
    },
    {
      invariantKind: "departure",
      statement: "Only the string ids cross into the census.",
    },
    {
      invariantKind: "departure",
      statement: "The census is written as numbered runs with an aggregate composing those runs.",
    },
    {
      invariantKind: "departure",
      statement: "A run whose body is already there is not staged again.",
    },
    {
      invariantKind: "departure",
      statement: "A clone with no string id refuses the call.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing lands here.",
    },
    {
      invariantKind: "departure",
      statement: "The writing call that lands the staged bodies is named instead.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes the clone.",
    },
    {
      invariantKind: "gap",
      statement: "The run count and the workspace-package page's part slugs are written together.",
    },
  ],
  name: "base-game-global",
  arguments: [{ argument: "argument/code-root" }],
} as const satisfies Command
