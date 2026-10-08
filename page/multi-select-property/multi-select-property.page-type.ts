import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const multiSelectProperty = {
  id: "01a0c4f3-6a9a-7c6c-9655-06c63fe3324c",
  type: "page-type/page-type",
  slug: "multi-select-property",
  definition: "a page property with many of a set of values the property states",
  icon: "list",
  extends: ["page-type/select-property"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A value of this kind is a list of the stated values rather than one of them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each value the list holds is drawn as a chip of its own.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  shapes: "jsonl",
  createdAt: "2026-09-21T17:11:22.010Z",
  updatedAt: "2026-09-24T19:54:52.000Z",
} as const satisfies PageType
