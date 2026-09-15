import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const positives = {
  id: "01a09b6d-4cdf-710e-83a5-07fa06d93f60",
  type: "file-property",
  slug: "positives",
  propertySlug: "positives",
  definition: "a turn a test answered yes on, one line appended as that turn is judged",
  extensions: ["jsonl"],
  generated: true,
  appendOnly: true,
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A line is appended rather than written over.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A line holds what was put to the model and what the model answered.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A line is written where a test answers yes rather than on every run.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A line names the rule judged and the seat the turn was under.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Lines are kept outside the commit.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "No page states its own lines here.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here says whether the yes was right.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A yes that cannot be recorded is not a turn that is let through.",
    },
  ],
  types: "ts",
} as const satisfies FileProperty
