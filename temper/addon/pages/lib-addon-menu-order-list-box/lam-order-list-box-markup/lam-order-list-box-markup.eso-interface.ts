import type { EsoInterface } from "akasha/code/eso-interface/eso-interface.page-type.types.ts"

export const lamOrderListBoxMarkup = {
  id: "01a06207-bdeb-77bc-a92f-e711237f036c",
  type: "page-type/eso-interface",
  slug: "lam-order-list-box-markup",
  definition: "the row, the button and the pointer label an order list box is built out of",
  markup: "xml",
  loadedAs: "LAM2_orderlistbox_widget.xml",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Every control here is virtual and is copied from rather than shown.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The game reads this document before the addon's Lua runs.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A control here is reached from Lua by the name the document gives that control.",
    },
  ],
} as const satisfies EsoInterface
