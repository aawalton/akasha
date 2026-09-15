import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const carried = {
  id: "01a0a67f-8361-7168-a93c-9877e30b109a",
  type: "page-type/file-property",
  slug: "carried",
  propertySlug: "carried",
  definition: "what a page carries, one line to a property",
  extensions: ["jsonl"],
  generated: true,
  runsFileLength: false,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A line holds one property the page states, under the key the page states it as.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line holds the value the page's body declares once that body has run.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The lines are sorted, so one property that changes moves one line.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reader wanting one property reads one line rather than the whole page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page whose body will not load has a file with no line.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "This file is written as the page lands, so nothing judges it against the page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "This file is written whole, so what it held before is never read to write it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Reading a page's properties from here is far cheaper than loading its body.",
    },
  ],
  types: "ts",
} as const satisfies FileProperty
