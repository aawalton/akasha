import type { CheckCode } from "akasha/check/code/check-code.page-type.types.ts"

export const relationResolves = {
  id: "01a04d99-71ca-7e06-9f74-3a462cb7d4fb",
  type: "page-type/check-code",
  slug: "relation-resolves",
  definition:
    "the check refusing a name that reaches no page, and a non-mortal page that names a mortal one",
  runsOnChange: true,
  runsOnDeploy: true,
  runsOnAudit: true,
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Which of a page's keys are relations is read from the index rather than from a list written here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A name reaches the index and the pages the change itself has.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page the change takes away stops being reachable.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A page the index says names a page being taken away is judged though the change names no such page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A name narrowing to more than one page is refused rather than taken as reached.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Mortality is judged on the page type the name reaches.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A name reaching no page is judged on the property's declared target.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A name an entry row states is resolved, and the refusal lands on the row's page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A name nested in a record inside an entry row is not resolved.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An entry row is read through the change rather than off the working tree.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A change carrying an entry file judges the page that file sits beside.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A property declaring more than one target is judged on the page a name reaches.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A name nested one record deep is resolved.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The refusal names the record and the field.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A name reaches a page of a page type the change itself adds.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A relation property the change introduces is judged.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Which pages named a page being taken away is read from that page's own references as they were.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "That reading is of the edges into that page rather than of every relation property in turn.",
    },
  ],
  check: { maxCpuSeconds: 10 },
  audit: { maxCpuSeconds: 60 },
} as const satisfies CheckCode
