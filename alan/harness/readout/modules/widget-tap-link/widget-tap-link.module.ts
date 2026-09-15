import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const widgetTapLink = {
  id: "01a078a5-b8d4-7914-bdf7-41f482a36806",
  type: "page-type/module",
  slug: "widget-tap-link",
  definition: "the widget a link names, read off the link's fragment",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The key a widget is named under is stated here alone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A link's fragment is what tells two widgets sharing a path and a query apart.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "Two of Alan's widgets have one path and one query.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A link naming no widget answers with nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Text that is no link answers with nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A link naming a widget with an empty name answers with nothing.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here counts a tap.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here navigates.",
    },
  ],
} as const satisfies Module
