import type { Module } from "@akasha/code/module"

export const deepLinkOpenSync = {
  id: "01a0655d-dab8-7c58-8569-1c6e3295591b",
  pageTypeSlug: "module",
  type: "module",
  slug: "deep-link-open-sync",
  definition: "a link the native shell was opened by, carried into the router",
  code: "tsx",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A link naming a widget counts a tap on that widget.",
    },
    {
      invariantKind: "departure",
      statement: "A link naming no widget counts nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A tap is counted before the link is routed.",
    },
    {
      invariantKind: "departure",
      statement: "A tap that cannot be counted leaves the routing alone.",
    },
    {
      invariantKind: "departure",
      statement: "A link the router refuses counts its tap all the same.",
    },
    {
      invariantKind: "departure",
      statement: "A link the listener already had is not carried again as the launch link.",
    },
    {
      invariantKind: "departure",
      statement:
        "The link the app was launched by is counted once however many readers take that link.",
    },
    {
      invariantKind: "constraint",
      statement: "One link arriving twice reads as two identical links arriving.",
    },
    {
      invariantKind: "stopgap",
      statement:
        "The delivery after the launch link is counted as no tap where the two links match.",
    },
    {
      invariantKind: "departure",
      statement: "A delivery naming another widget spends the launch link's hold on the count.",
    },
    {
      invariantKind: "departure",
      statement: "The widget that launched the app is the only widget that loses a tap this way.",
    },
    {
      invariantKind: "gap",
      statement:
        "A tap made after the app was launched is told apart from one link arriving twice.",
    },
  ],
} as const satisfies Module
