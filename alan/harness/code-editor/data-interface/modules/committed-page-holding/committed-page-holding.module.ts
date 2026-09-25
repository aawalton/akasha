import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const committedPageHolding = {
  id: "01a0d9bd-4dd6-72a2-bb76-f3ecaf808ed4",
  type: "page-type/module",
  slug: "committed-page-holding",
  definition: "what each page last gave the commit watcher's pictures, held between redraws",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A page is held by its path and a hash of its bytes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page is read again only where its hash changed or the page is new.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The pictures redrawn at one commit share one reading of the pages.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page that went is dropped from what is held.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A page's gaps depend on that page alone, so they are kept until its hash changes.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "A page's refusals depend on the constructions, on every page's spellings and on the types judged.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every page is judged again when any of those three changes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page is judged by the grammar check's own judging of one page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The refusals and gaps held come out in the order a whole reading gives them.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes a file.",
    },
  ],
} as const satisfies Module
