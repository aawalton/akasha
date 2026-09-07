import type { Module } from "@akasha/code/module"

export const changeActing = {
  id: "01a07c62-0a71-737e-8955-3410b4a608bf",
  pageTypeSlug: "module",
  slug: "change-acting",
  definition: "the acts `akasha change` runs over the edits kept rather than over a change",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An act here names no change and runs no change.",
    },
    {
      invariantKind: "departure",
      statement: "An act reaches the edits kept beside the calling agent's page.",
    },
    {
      invariantKind: "departure",
      statement: "How one edit is said in a report is worded here rather than by each act.",
    },
    {
      invariantKind: "departure",
      statement: "A drop naming paths reads each path against the repository root.",
    },
    {
      invariantKind: "departure",
      statement: "A drop naming paths leaves every edit no path named.",
    },
    {
      invariantKind: "departure",
      statement: "A path naming no edit kept refuses the drop rather than being passed over.",
    },
    {
      invariantKind: "departure",
      statement: "A drop leaves every edit a subagent handed over.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads an argument off the command line.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here lands.",
    },
  ],
} as const satisfies Module
