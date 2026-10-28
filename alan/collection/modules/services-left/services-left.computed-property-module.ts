import type { ComputedPropertyModule } from "akasha/page/computed-property-module/computed-property-module.page-type.types.ts"

export const servicesLeft = {
  id: "01a1847f-d8d9-7c31-8dca-da3468ca4b24",
  type: "page-type/computed-property-module",
  slug: "services-left",
  definition: "the services what is left of a collection streams on",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A collection not completed counts the services it streams on itself.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A collection counts every service its unfinished parts stream on.",
    },
  ],
  createdAt: "2026-10-28T22:40:00.000Z",
  updatedAt: "2026-10-28T22:40:00.000Z",
} as const satisfies ComputedPropertyModule
