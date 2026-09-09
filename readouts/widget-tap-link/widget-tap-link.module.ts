import type { Module } from "@akasha/code/module"

export const widgetTapLink = {
  id: "01a078a5-b8d4-7914-bdf7-41f482a36806",
  pageTypeSlug: "module",
  type: "module",
  slug: "widget-tap-link",
  definition: "the widget a link names, read off the link's fragment",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The key a widget is named under is stated here alone.",
    },
    {
      invariantKind: "departure",
      statement: "A link's fragment is what tells two widgets sharing a path and a query apart.",
    },
    {
      invariantKind: "constraint",
      statement: "Two of Alan's widgets have one path and one query.",
    },
    {
      invariantKind: "departure",
      statement: "A link naming no widget answers with nothing.",
    },
    {
      invariantKind: "departure",
      statement: "Text that is no link answers with nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A link naming a widget with an empty name answers with nothing.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here counts a tap.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here navigates.",
    },
  ],
} as const satisfies Module
