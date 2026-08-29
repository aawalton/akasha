import type { Check } from "../check.page-type.ts"

export const domainIsNamedByAParent = {
  id: "01a04d5f-c731-7000-9066-3abf317a1d58",
  pageTypeSlug: "check",
  slug: "domain-is-named-by-a-parent",
  definition: "the check refusing a domain that no other page names among its parts",
  code: "ts",
  test: "ts",
  runsOn: [],
  design: [
    {
      invariantKind: "departure",
      statement:
        "Only a page whose own page type is `domain` is judged, never one whose page type descends from it.",
    },
    {
      invariantKind: "departure",
      statement:
        "The page is found from its path alone.",
    },
    {
      invariantKind: "absence",
      statement:
        "The body is not read.",
    },
    {
      invariantKind: "departure",
      statement:
        "Whether a page names it is one identity read and one directory listed.",
    },
    {
      invariantKind: "departure",
      statement:
        "`akasha-system` alone is passed over.",
    },
    {
      invariantKind: "departure",
      statement:
        "An index answering other than one page to the slug is thrown on, never passed.",
    },
    {
      invariantKind: "departure",
      statement:
        "A domain the change takes away is passed over.",
    },
    {
      invariantKind: "absence",
      statement:
        "This states no phase, because a phase reads the index as the last landed change left it: a new domain and the parent naming it arrive together, the parent's edge is filed only after that change lands, and so every domain ever added would be refused.",
    },
  ],
  intent: [
    {
      invariantKind: "gap",
      statement: "Every domain is reached by reading down from `akasha-system`.",
    },
  ],
} as const satisfies Check
