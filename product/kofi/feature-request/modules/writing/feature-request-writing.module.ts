import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const featureRequestWriting = {
  id: "01a0c506-47e8-7344-b421-891510dff6c4",
  type: "page-type/module",
  slug: "feature-request-writing",
  definition: "what lands when a contributor opens a feature request or boosts one",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A contributor is handed in, so who is signed in is read by nothing here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An ask is trimmed, and an ask left empty opens no request.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An ask past the length its own property allows opens no request.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "What the points do is worked out by `contribution-point-spending` alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A request opens `proposed`, boosted by the points its proposer paid.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A request is named by its ask, so every listing draws the ask as the title.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A request is named against every feature request slug the pages hold.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A request and the contributor who moved the points land in one write.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A request of another product takes no boost here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A balance is worked out by `contribution-point-balance` before each write.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refusal is answered in words rather than thrown.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Where a refusal is shown is the caller's to say.",
    },
  ],
} as const satisfies Module
