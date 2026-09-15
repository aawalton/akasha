import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const turnColorScheme = {
  id: "01a0680b-7175-7000-bad0-dd03b18ea236",
  type: "module",
  slug: "turn-color-scheme",
  definition: "the color a turn path is drawn in and the sentence a turn state reads as",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A color is named by the palette name in the path.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The color id is that name under one fixed prefix.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A turn, a subagent and a stopped seat are read out of a path the same way.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every color id this answers is one the editor's manifest contributes.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A color the manifest contributes is the hex the palette answers that name with.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A name the palette does not have is drawn in no color.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Children are tallied by the color each one carries.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A tally counts the children a row has directly rather than every one beneath it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A child carrying no color is counted by no tally.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A color no child carries has no tally rather than a tally of none.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The tallies come back in the order the palette states its names.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A state of `unknown` is said as nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A state with something waited on is said as the state and that thing.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here has the color values.",
    },
  ],
} as const satisfies Module
