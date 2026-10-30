import type { ComputedPropertyModule } from "akasha/page/computed-property-module/computed-property-module.page-type.types.ts"

export const dayString = {
  id: "01a05c77-31e6-7984-b078-7e97cacbeefb",
  type: "page-type/computed-property-module",
  slug: "day-string",
  definition: "how code handles a day written in text",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A dashed date is read in UTC whatever zone settled the dashed date.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A day is stepped from noon rather than from midnight.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A day that will not parse is handed back unchanged rather than refused.",
    },
  ],
  createdAt: "2026-09-01T10:15:10.566Z",
  updatedAt: "2026-10-30T15:41:13.835Z",
} as const satisfies ComputedPropertyModule
