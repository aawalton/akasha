import type { Check } from "../check.page-type.ts"

export const domainIsNamedByAParent = {
  id: "01a04d5f-c731-7000-9066-3abf317a1d58",
  pageTypeSlug: "check",
  slug: "domain-is-named-by-a-parent",
  definition: "the check refusing a domain that no other page names among its parts",
  code: "ts",
  test: "ts",
  runsOnPatch: false,
  runsOnWorktree: false,
  runsOnDeploy: false,
  runsOnAudit: true,
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "Every page whose page type stands under `domain` is judged, not only one whose own page type is `domain`.",
    },
    {
      invariantKind: "departure",
      statement:
        "The page is found from its path and the page types the index holds, never by walking.",
    },
    {
      invariantKind: "absence",
      statement: "The body is not read.",
    },
    {
      invariantKind: "departure",
      statement: "Whether a page names it is one identity read and one directory listed.",
    },
    {
      invariantKind: "departure",
      statement: "`domain/akasha-system` alone is passed over, as the one page standing under none.",
    },
    {
      invariantKind: "departure",
      statement: "An index answering other than one page to the slug is thrown on, never passed.",
    },
    {
      invariantKind: "departure",
      statement: "A domain the change takes away is passed over.",
    },
    {
      invariantKind: "departure",
      statement: "This runs at audit alone.",
    },
    {
      invariantKind: "gap",
      statement: "Every page standing under `domain` is reached by reading down from `akasha-system`.",
    },
    {
      invariantKind: "gap",
      statement: "A domain arriving with the parent that names it is judged before it lands.",
    },
  ],
} as const satisfies Check
