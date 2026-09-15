import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const hookLinks = {
  id: "01a08dc1-ffb8-707b-b5d8-3633bf16ddae",
  type: "module",
  slug: "hook-links",
  definition: "the fixed path outside the repository a hook is registered through",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A registration names a link outside every checkout rather than a path inside one.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The link's own path is the one thing a running client holds that never changes.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A link is named for the event the client calls that link at.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every link points at the one dispatch the index answers for.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The dispatch is reached through the index rather than spelled here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A link already pointing where it should is left alone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A link pointing into another checkout at a file that is there is left alone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A link pointing at a file that is gone is written again by a run in the checkout the links serve.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A tree mounted for one run is another checkout, so a run there claims no link.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A link is put in place by a rename, so no call finds the path holding nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The links sit under a folder outliving a reboot rather than under a run folder.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The events a mend covers are the names the links folder already holds.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A mend reads the index only where some link points at a file that is gone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A mend that fails answers what failed rather than stopping its caller.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The name that answer opens with is handed in rather than spelled here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A name carrying the mark of a half-written link is no event.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "The dispatch cannot write the link a client reaches the dispatch through.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads a hook or judges a call.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Only a run in the checkout the links serve claims a link.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The checkout the links serve is the one the environment names.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A tree mounted for one run is known by the mount the environment names.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The environment names that mount and that checkout as one path under the mount.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A root that cannot be matched against that checkout claims no link.",
    },
  ],
} as const satisfies Module
