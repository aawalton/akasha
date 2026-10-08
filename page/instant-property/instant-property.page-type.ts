import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const instantProperty = {
  id: "01a053de-99ba-762f-9c2f-ba77a8468f7a",
  type: "page-type/page-type",
  slug: "instant-property",
  definition: "a page property with a single point in time",
  icon: "clock",
  extends: ["page-type/page-property"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An instant is written as ISO 8601 in UTC to the millisecond and closes with `Z`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An instant property's slug closes with `-at`.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  shapes: "jsonl",
  createdAt: "2026-08-30T18:11:32.410Z",
  updatedAt: "2026-09-24T19:54:52.000Z",
} as const satisfies PageType
