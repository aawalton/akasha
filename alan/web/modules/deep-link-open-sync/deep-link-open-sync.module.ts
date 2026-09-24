import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const deepLinkOpenSync = {
  id: "01a0655d-dab8-7c58-8569-1c6e3295591b",
  type: "page-type/module",
  slug: "deep-link-open-sync",
  definition: "a link the native shell was opened by, carried into the router",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A link naming a widget counts a tap on that widget.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A link naming no widget counts nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tap is counted before the link is routed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tap that cannot be counted leaves the routing alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A link the router refuses counts its tap all the same.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A link the listener already had is not carried again as the launch link.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The link the app was launched by is counted once however many readers take that link.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "One link arriving twice is taken as two identical links arriving.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A delivery naming a tap already counted counts nothing.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement:
        "A delivery naming no tap after the launch link is counted as no tap where the two links match.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A delivery naming another widget spends the launch link's hold on the count.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The widget that launched the app is the only widget that loses a tap this way.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement:
        "A tap made after the app was launched is told apart from one link arriving twice.",
    },
  ],
} as const satisfies Module
