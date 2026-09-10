import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const hookLinks = {
  id: "01a08dc1-ffb8-707b-b5d8-3633bf16ddae",
  pageTypeSlug: "module",
  type: "module",
  slug: "hook-links",
  definition: "the fixed path outside the repository a hook is registered through",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A registration names a link outside every checkout rather than a path inside one.",
    },
    {
      invariantKind: "departure",
      statement: "The link's own path is the one thing a running client holds that never changes.",
    },
    {
      invariantKind: "departure",
      statement: "A link is named for the event the client calls that link at.",
    },
    {
      invariantKind: "departure",
      statement: "Every link points at the one dispatch the index answers for.",
    },
    {
      invariantKind: "departure",
      statement: "The dispatch is reached through the index rather than spelled here.",
    },
    {
      invariantKind: "departure",
      statement: "A link already pointing where it should is left alone.",
    },
    {
      invariantKind: "departure",
      statement: "A link is put in place by a rename, so no call finds the path holding nothing.",
    },
    {
      invariantKind: "departure",
      statement: "The links sit under a folder outliving a reboot rather than under a run folder.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a hook or judges a call.",
    },
  ],
} as const satisfies Module
