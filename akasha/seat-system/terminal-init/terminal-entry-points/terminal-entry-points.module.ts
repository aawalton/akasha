import type { Module } from "@akasha/code-system/module"

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
      statement: "The checkout is whatever the environment names, falling back to the one at home.",
    },
    {
      invariantKind: "departure",
      statement: "A function expands the checkout once into a local and spells the rest from it.",
    },
    {
      invariantKind: "departure",
      statement:
        "The supervisor and the pty proxy are spelled from the paths seat-launching holds.",
    },
    {
      invariantKind: "departure",
      statement: "A seat begins in the folder holding the checkouts rather than in the checkout.",
    },
    {
      invariantKind: "stopgap",
      statement: "The old ops entry point is spelled here while its acts are still carried there.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads the disk or runs a process.",
    },
  ],
} as const satisfies Module
