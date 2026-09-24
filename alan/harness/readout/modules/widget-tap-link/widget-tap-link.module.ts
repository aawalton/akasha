import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const widgetTapLink = {
  id: "01a078a5-b8d4-7914-bdf7-41f482a36806",
  type: "page-type/module",
  slug: "widget-tap-link",
  definition: "the widget and the tap a link names, read off the link's fragment",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The key a widget is named under is stated here alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A link's fragment is what tells two widgets sharing a path and a query apart.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "Two of Alan's widgets have one path and one query.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A link naming no widget answers with nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Text that is no link answers with nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A link naming a widget with an empty name answers with nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A link names the one tap it was made for beside the widget, under the key `tap`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A link naming no tap, or a tap with an empty name, answers with no tap.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here counts a tap.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here navigates.",
    },
  ],
} as const satisfies Module
