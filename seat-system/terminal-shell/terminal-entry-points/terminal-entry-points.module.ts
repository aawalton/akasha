import type { Module } from "@akasha/code/module"

export const terminalEntryPoints = {
  id: "01a0680a-fa30-7c2d-9713-6347088773b7",
  pageTypeSlug: "module",
  slug: "terminal-entry-points",
  definition: "the paths a terminal's bash spells to reach akasha",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A path here is shell text the terminal expands rather than a path read now.",
    },
    {
      invariantKind: "departure",
      statement: "The checkout is whatever the environment names.",
    },
    {
      invariantKind: "departure",
      statement: "The checkout at home is used where the environment names no checkout.",
    },
    {
      invariantKind: "departure",
      statement:
        "A function expands the checkout once into a local and spells the rest from that local.",
    },
    {
      invariantKind: "departure",
      statement:
        "The supervisor and the pty proxy are spelled from the paths seat-launching holds.",
    },
    {
      invariantKind: "departure",
      statement: "A seat begins in the folder with the checkouts rather than in the checkout.",
    },
    {
      invariantKind: "departure",
      statement:
        "The akasha command is spelled here as the path a terminal reaches a command through.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the disk or runs a process.",
    },
  ],
} as const satisfies Module
