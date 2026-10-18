import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const addonMenuWidgetPanel = {
  id: "01a06100-0000-7000-8000-000000000025",
  type: "page-type/module",
  slug: "addon-menu-widget-panel",
  definition: "the scrolling page of an addon's settings, headed by its name",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A panel's title is plain text in the game's section title color.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No panel shows an author or version line.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The website and feedback and translation and donation links are laid out in one row.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A donation link is colored gold where the other links are blue.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The refresh callback is registered once however many panels ask for that callback.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Forcing defaults walks the registered controls and then fires a refresh.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A panel's control is named with this menu and the id the declaring addon gave.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An id a foreign addon gives names no global of its own.",
    },
  ],
  createdAt: "2026-09-02T07:23:05.088Z",
  updatedAt: "2026-10-18T19:49:43.242Z",
} as const satisfies Module
