import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const scrollableMenuWebLook = {
  id: "01a0da81-9052-7f06-b98a-ae7161dff160",
  type: "page-type/module",
  slug: "scrollable-menu-web-look",
  definition: "the web's look on a scrollable menu a Temper window opens",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A menu, context menu or submenu takes the web's look as it shows.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Whether it does is settled by the control that opened it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A menu gets the game's look back as it hides.",
    },
  ],
} as const satisfies Module
