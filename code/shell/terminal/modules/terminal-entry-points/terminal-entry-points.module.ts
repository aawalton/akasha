import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const terminalEntryPoints = {
  id: "01a0680a-fa30-7c2d-9713-6347088773b7",
  type: "module",
  slug: "terminal-entry-points",
  definition: "the paths a terminal's bash spells to reach akasha",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path here is shell text the terminal expands rather than a path read now.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The checkout is whatever the environment names.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The checkout at home is used where the environment names no checkout.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A function expands the checkout once into a local and spells the rest from that local.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The supervisor and the pty proxy are spelled from the paths seat-entry-paths answers.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A seat begins in the folder with the checkouts rather than in the checkout.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The akasha command is spelled here as the path a terminal reaches a command through.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Where the launcher that command runs sits is asked of the index.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here runs a process.",
    },
  ],
} as const satisfies Module
