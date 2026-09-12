import type { Command } from "akasha/commands/command.page-type.types.ts"

export const temperEsoDeclarationAudit = {
  id: "01a0685d-f8fa-7053-bb0f-5165c5bbb41a",
  type: "command",
  slug: "temper-eso-declaration-audit",
  definition:
    "the command reading which committed game artifacts are stamped behind the clone they came from",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The reading needs the clone and the checkout at once.",
    },
    {
      invariantKind: "departure",
      statement: "The artifacts read are the generated files under `temper` in the checkout.",
    },
    {
      invariantKind: "departure",
      statement: "A call naming no documentation file reads the clone's at `~/esoui`.",
    },
    {
      invariantKind: "departure",
      statement:
        "A clone-derived artifact carries a provenance line naming the command that rebuilds it.",
    },
    {
      invariantKind: "departure",
      statement: "A finding is reported rather than refused.",
    },
    {
      invariantKind: "departure",
      statement: "A run with findings still succeeds.",
    },
    {
      invariantKind: "departure",
      statement: "A comparison that could not be made refuses rather than reading as no drift.",
    },
    {
      invariantKind: "departure",
      statement: "An artifact with no stamp is set aside and named apart from the comparison.",
    },
    {
      invariantKind: "departure",
      statement: "The denominator is the artifacts compared rather than the artifacts found.",
    },
    {
      invariantKind: "departure",
      statement: "A finding names the command that rebuilds the artifact.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes an artifact or the clone.",
    },
    {
      invariantKind: "departure",
      statement: "An argument this command does not take is refused rather than passed over.",
    },
    {
      invariantKind: "departure",
      statement: "An argument said twice is refused rather than read as the first saying.",
    },
    {
      invariantKind: "departure",
      statement: "A test seam is taken after the world, so a real call reaches the work.",
    },
  ],
  name: "declaration-audit",
  arguments: [
    { argument: "argument/json" },
    { argument: "argument/code-root" },
    { argument: "argument/eso-doc" },
  ],
} as const satisfies Command
