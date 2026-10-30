import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const monarchDomainFiles = {
  id: "01a06865-ecc3-7ebe-8112-4082e54070c4",
  type: "page-type/module",
  slug: "monarch-domain-files",
  definition: "how code writes each Monarch record that is not a month from the rows Monarch holds",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A page is one TypeScript file with one exported object named for the page's slug.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A new page's whole body is composed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page already there is edited only where its values changed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The keys a page states are stated in one settled order.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A page's body is composed by `page-body` and edited by `page-body-editing` rather than here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row's name is folded into a stem by `page-stem` rather than folded here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A word repeated next to itself is said once.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here judges a line's width.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page's identity is minted once and kept when the page is rewritten.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page composed names its type from the root rather than by a relative path.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The type a page names sits one folder above the folder that page is written into.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Two rows slugging alike are told apart by Monarch's own id rather than by a number.",
    },

    {
      decisionKind: "decision-kind/departure",
      statement: "Every page landed is landed from inside akasha.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A holding names the account it sits in by page type and slug.",
    },
  ],
  createdAt: "2026-09-03T17:51:45.347Z",
  updatedAt: "2026-10-30T15:38:07.218Z",
} as const satisfies Module
