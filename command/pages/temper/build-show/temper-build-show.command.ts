import type { Command } from "akasha/command/command.page-type.types.ts"

export const temperBuildShow = {
  id: "01a159b7-e764-7795-9a9c-3d573f94789b",
  type: "page-type/command",
  slug: "temper-build-show",
  definition:
    "the command setting out what a build holds, how two builds differ, or where a character falls short",
  code: "ts",
  test: "ts",
  parts: [
    "module/build-show-fields",
    "module/build-show-naming",
    "module/build-show-gaps",
    "module/build-show-gap-stats",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A build is named by its hash, a build page's slug, a character's slug or a reading's id.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The catalogs a hash's numbers point into are read before the hash is decoded.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A test hands the command catalogs it already holds rather than reading them live.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A hash is decoded as a character's build, and as a companion's where it is not one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The answer opens by saying where the build was found, and gives its hash.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A build shows its character, gear, skills, passives, stars and Temper's stats for each bar.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A second build named shows only what differs between the two.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each difference sets the first build's value above the second's.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A character named for its gaps shows only where it falls short of the first build.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A build is set against a second build or checked for gaps, not both.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A word that names nothing and does not decode is refused.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reaches the game.",
    },
  ],
  name: "build-show",
  arguments: [
    { argument: "argument/build", required: true, saidAs: "flag-or-word" },
    { argument: "argument/compare", notWith: ["argument/gaps"] },
    { argument: "argument/gaps", notWith: ["argument/compare"] },
    { argument: "argument/json" },
  ],
  createdAt: "2026-10-20T14:29:46.979Z",
  updatedAt: "2026-10-20T16:22:46.024Z",
} as const satisfies Command
