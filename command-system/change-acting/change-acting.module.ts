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
      statement: "One reading of the lines piped in serves every act that names paths.",
    },
    {
      invariantKind: "departure",
      statement: "An act words its own refusals rather than borrowing another act's words.",
    },
    {
      invariantKind: "departure",
      statement: "An act naming paths reads each path against the repository root.",
    },
    {
      invariantKind: "departure",
      statement: "An act naming paths leaves every edit no path named.",
    },
    {
      invariantKind: "departure",
      statement: "An act piping nothing in is refused rather than reaching every edit.",
    },
    {
      invariantKind: "departure",
      statement:
        "A path naming no edit an act reaches refuses that act rather than being passed over.",
    },
    {
      invariantKind: "departure",
      statement: "A drop reaches the edits kept, and a take and a forget the edits handed over.",
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
