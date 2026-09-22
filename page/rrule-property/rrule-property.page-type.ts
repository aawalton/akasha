import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const rruleProperty = {
  id: "01a0c507-6bf0-71a3-b7d9-5e878c5c4d9b",
  type: "page-type/page-type",
  slug: "rrule-property",
  definition: "a page property holding a recurrence rule and that rule's starting point",
  extends: ["page-type/page-property"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A value of this kind is a rule beside whether that rule counts from the last completion.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A value that is a rule alone counts from the occurrence rather than the doing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page type stating what a rule counts from beside the rule states it that way.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A value of this kind is drawn as the rule reads in words rather than as its iCalendar text.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  shapes: "jsonl",
} as const satisfies PageType
