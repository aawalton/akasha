import type { ComputedPropertyModule } from "akasha/page/computed-property-module/computed-property-module.page-type.types.ts"

export const seatSection = {
  id: "01a0e3e8-a98b-74d1-91a6-5896d43a88b6",
  type: "page-type/computed-property-module",
  slug: "seat-section",
  definition: "where a list of seats shows a seat",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat whose role is the handler role is drawn under the handlers.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat assigned a story of any kind is drawn under that story.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every other seat is drawn under the personas.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The editor's agents panel and the seats view take a seat's section from here.",
    },
  ],
  createdAt: "2026-09-27T17:27:50.923Z",
  updatedAt: "2026-10-19T20:11:21.337Z",
} as const satisfies ComputedPropertyModule
