import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const positives = {
  id: "01a09b6d-4cdf-710e-83a5-07fa06d93f60",
  type: "page-type/file-property",
  slug: "positives",
  propertySlug: "positives",
  definition: "a turn a test answered yes on, a line appended as that turn is judged",
  extensions: ["jsonl"],
  generated: true,
  appendOnly: true,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A line is appended rather than written over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line holds what was put to the model and what the model answered.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line is written where a test answers yes rather than on every run.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line names the rule judged and the seat the turn was under.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Lines are kept outside the commit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No page states its own lines here.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here says whether the yes was right.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A yes that cannot be recorded is not a turn that is let through.",
    },
  ],
  types: "ts",
} as const satisfies FileProperty
