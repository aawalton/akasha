import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const statusBarTheme = {
  id: "01a064c8-9a9c-7a35-9db1-b8f1d3cbf839",
  type: "module",
  slug: "status-bar-theme",
  definition:
    "the colors the status bar's figure slots take and the color and glyph a separator takes",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A color here is read from the color page of that color as a hex triplet.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A separator takes the plain grey the palette states.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A separator takes a color apart from every figure color.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The neutral every figure takes is lighter than the separator's grey.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The glyph a separator shows is a vertical bar.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here says which slot takes which color.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reads a color the editor's own theme names.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every figure on the status bar takes one and the same neutral.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "That neutral is the design's second text color rather than its brightest.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A figure earning no color from a scale takes a neutral.",
    },
  ],
} as const satisfies Module
