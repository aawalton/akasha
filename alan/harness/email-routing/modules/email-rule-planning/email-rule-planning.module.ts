import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const emailRulePlanning = {
  id: "01a0a13e-68ba-75e1-9530-f6b30bf6b3c0",
  type: "module",
  slug: "email-rule-planning",
  definition:
    "the routing rules a zone is short of, worked out from the addresses the personas declare",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here plans a rule to be taken away or turned off.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An address is folded to lower case on both sides before being compared.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A rule claims an address by a literal matcher on `to` and by nothing else.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A catch-all rule matches on `all` and so claims no address.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An address any rule claims is left alone, whatever that rule is named.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "An address claimed only by a rule that is turned off is named rather than claimed twice.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An address a rule claims that no persona declares is named in the plan.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Only an address under the zone's own domain is planned for.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The destination copied is the one the rules named `persona-auto` forward to.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Where no rule carries that name, every rule that forwards is read instead.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "More than one destination is refused rather than chosen between.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "No rule forwarding anywhere is refused rather than filled in from elsewhere.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A rule is named for the address it routes and the address it forwards on to.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A plan taken over the rules its own last plan wrote plans nothing.",
    },
  ],
} as const satisfies Module
