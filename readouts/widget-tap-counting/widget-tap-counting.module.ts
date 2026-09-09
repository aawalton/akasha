import type { Module } from "@akasha/code/module"

export const widgetTapCounting = {
  id: "01a078a8-b96f-765d-99ff-5703d9b2edd3",
  pageTypeSlug: "module",
  type: "module",
  slug: "widget-tap-counting",
  definition: "the taps a widget has taken, counted through the page store",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A widget's taps are read and written through the page store.",
    },
    {
      invariantKind: "departure",
      statement: "A caller with a clone of the tree has no index to find a widget's file by.",
    },
    {
      invariantKind: "departure",
      statement: "A tap never reaches the commit.",
    },
    {
      invariantKind: "departure",
      statement: "Two taps arriving together cost one tap.",
    },
    {
      invariantKind: "departure",
      statement: "The moment of the last tap is written beside the count.",
    },
    {
      invariantKind: "departure",
      statement: "A widget with no count has taken no tap.",
    },
    {
      invariantKind: "departure",
      statement: "The two keys a tap is counted under are named here alone.",
    },
    {
      invariantKind: "departure",
      statement: "A count that is no number is refused rather than read as no tap.",
    },
    {
      invariantKind: "departure",
      statement: "A slug no widget page has answers with nothing.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here decides a tap happened.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a link.",
    },
    {
      invariantKind: "gap",
      statement: "The round trip to the store is proved by a test.",
    },
  ],
} as const satisfies Module
