import type { Command } from "akasha/commands/command.page-type.types.ts"

export const temperEsoDeclarationAudit = {
  id: "01a0685d-f8fa-7053-bb0f-5165c5bbb41a",
  type: "command",
  slug: "temper-eso-declaration-audit",
  definition:
    "the command reading which committed game artifacts are stamped behind the clone they came from",
  code: "ts",
  taking: [
    {
      said: "--code-root <path>",
      takes: "the checkout the committed artifacts are read from",
    },
    {
      said: "--eso-doc <path>",
      takes: "the documentation file the clone's API version is read from",
    },
    {
      said: "--json",
      takes: "give the reading as one line of JSON rather than as the report a person reads",
    },
  ],
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
  ],
  name: "declaration-audit",
  arguments: [{ argument: "argument/json" }],
} as const satisfies Command
