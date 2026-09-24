import type { IosComponent } from "akasha/code/ios-component/ios-component.page-type.types.ts"

export const widgetTapLink = {
  id: "01a0d505-14ca-7e0b-878b-a75d1d4532a5",
  type: "page-type/ios-component",
  slug: "widget-tap-link",
  definition: "the link a tap on a widget opens, naming that one tap",
  swift: "swift",
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "A link a widget's view carries is the same on every tap until the entry reloads.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tap's id is made as the tap is made rather than as the widget is drawn.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every tap makes a fresh id.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "An intent a widget runs opens a link only from iOS 18.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A phone before iOS 18 opens a link naming no tap.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A tap on a widget's margin outside the button opens a link naming no tap.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "An intent opens a link only by a scheme the app has taken.",
    },
  ],
} as const satisfies IosComponent
