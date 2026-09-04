import type { Module } from "../../code-system/modules/module.page-type.ts"

export const domainTreePanel = {
  id: "01a06867-dbcb-7dfc-899e-b45619e04890",
  pageTypeSlug: "module",
  slug: "domain-tree-panel",
  definition: "the Domains panel brought up, and when the domains are read again for it",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The panel is read once as it starts, before any write asks for a read.",
    },
    {
      invariantKind: "departure",
      statement:
        "An answer equal byte for byte to the one drawn redraws nothing and records nothing.",
    },
    {
      invariantKind: "departure",
      statement: "An answer that says nothing new doubles the quiet demanded of the corpus.",
    },
    {
      invariantKind: "departure",
      statement: "The quiet demanded never grows past the deadline a write is answered within.",
    },
    {
      invariantKind: "departure",
      statement:
        "The quiet asked of a request is whatever is left of that deadline where that is sooner.",
    },
    {
      invariantKind: "departure",
      statement:
        "A write landing on a drawn row or carrying a drawn kind's ending shortens the quiet.",
    },
    {
      invariantKind: "departure",
      statement:
        "The kinds a write is weighed against are read off the answer rather than listed here.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page type's ending counts as a drawn kind though no page of that kind is drawn.",
    },
    {
      invariantKind: "departure",
      statement: "Which write shortens the quiet is a hint, and every write still asks for a read.",
    },
    {
      invariantKind: "departure",
      statement: "A write arriving while the panel is hidden is owed a read rather than read for.",
    },
    {
      invariantKind: "departure",
      statement: "A panel becoming visible with a read owed is read for at once, with no quiet.",
    },
    {
      invariantKind: "departure",
      statement: "A read that fails leaves no drawn answer, so the next one that succeeds redraws.",
    },
    {
      invariantKind: "departure",
      statement:
        "A read that fails says why in the view rather than leaving the rows drawn as true.",
    },
    {
      invariantKind: "departure",
      statement: "A domain no root reaches is said to Alan once and named on the channel.",
    },
    {
      invariantKind: "departure",
      statement: "Every read's outcome is recorded as an observation under the panel's name.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here composes the tree.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here decides what a row looks like.",
    },
  ],
} as const satisfies Module
