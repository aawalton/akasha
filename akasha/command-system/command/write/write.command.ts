import type { Command } from "../command.page-type.ts"

export const write = {
  id: "01a04beb-8a78-7a92-89a8-7ff777fb51ff",
  pageTypeSlug: "command",
  slug: "write",
  definition: "whole file bodies carried in, gated together and landed or refused as one",
  code: "ts",
  test: "ts",
  mechanical: false,
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A body reaches this only as a file named at `--content-file`, never on the command line.",
    },
    {
      invariantKind: "departure",
      statement: "A path outside the akasha folder is refused.",
    },
    {
      invariantKind: "departure",
      statement:
        "The bodies written and the paths taken away by one call are one gated commit, or none.",
    },
    {
      invariantKind: "departure",
      statement: "What a call said is read here; what it asked for is landed by `asking`.",
    },
    {
      invariantKind: "gap",
      statement:
        "A caller hands in whole bodies and learns whether they were taken, never half-taken.",
    },
  ],
} as const satisfies Command
