import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const hudLayoutApply = {
  id: "01a17ed9-eef6-704d-8e98-2539e5793c8d",
  type: "page-type/module",
  slug: "hud-layout-apply",
  definition: "the HUD layout put onto the game's controls as the game runs",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every panel is placed again one frame after a panel shows, hides or changes height.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every panel is placed again after Edit HUD puts its own positions back.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The docks' room begins below Temper's bar while that bar is shown.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A panel the game has not made yet is left out until the game makes it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A panel that shrinks states the height it wants and is told the room it has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A panel that shrinks is told its room only when that room changes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A panel measured by another control is as tall as that control.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A panel measured by another control is made as tall as that control, so it covers nothing below it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every panel is placed again one frame after a control measuring a panel changes height.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A panel whose measuring control the game has not made yet is as tall as its own control.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Where no layout reached the game, nothing is moved.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes the positions Edit HUD keeps.",
    },
  ],
  createdAt: "2026-10-27T19:32:54.134Z",
  updatedAt: "2026-10-27T19:39:59.699Z",
} as const satisfies Module
