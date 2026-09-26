import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const readSettling = {
  id: "01a0deed-1edf-75c6-b82f-a115865ff28b",
  type: "page-type/module",
  slug: "read-settling",
  definition: "a read answered over a checkout no landing changed while that read ran",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A read takes no hold.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A read starts only while no landing holds the checkout.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A read ending while a landing holds the checkout is answered again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A read ending after a landing moved the commit or the staging is answered again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A read answered again as many times as this allows is refused rather than answered torn.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A read waiting past the longest wait for a hold is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A hold whose holder is gone is taken as no hold.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "A landing failing after it wrote, moving neither commit nor staging, is not seen.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here puts work inside the hold.",
    },
  ],
} as const satisfies Module
