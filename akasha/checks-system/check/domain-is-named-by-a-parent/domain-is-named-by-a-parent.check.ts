import type { Check } from "../check.page-type.ts"

export const domainIsNamedByAParent = {
  id: "01a04d5f-c731-7000-9066-3abf317a1d58",
  pageTypeSlug: "check",
  slug: "domain-is-named-by-a-parent",
  definition: "the check refusing a domain that no other page names among its parts",
  code: "ts",
  test: "ts",
  runsOnPatch: true,
  runsOnWorktree: false,
  runsOnDeploy: false,
  runsOnAudit: true,
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "Every page whose page type stands under `domain` is judged rather than only one whose own page type is `domain`.",
    },
    {
      invariantKind: "departure",
      statement: "A page type the change itself puts under `domain` counts.",
    },
    {
      invariantKind: "departure",
      statement:
        "The page is found from its path and the page types the index holds rather than by walking.",
    },
    {
      invariantKind: "absence",
      statement: "The body of the page judged is not read.",
    },
    {
      invariantKind: "absence",
      statement: "The body a change replaces is read.",
    },
    {
      invariantKind: "departure",
      statement:
        "Whether a page names it is one directory listed on the index as the change leaves it.",
    },
    {
      invariantKind: "departure",
      statement: "`domain/akasha-system` alone is passed over.",
    },
    {
      invariantKind: "departure",
      statement:
        "Which page stands at a path is asked of the path index rather than of the slug its file name says.",
    },
    {
      invariantKind: "departure",
      statement: "A path the index files nothing for is passed over rather than thrown on.",
    },
    {
      invariantKind: "absence",
      statement: "Why nothing is filed for a path is not said here.",
    },
    {
      invariantKind: "absence",
      statement:
        "A page stating no `id` and a body that will not load are refused in words beside this in every phase.",
    },
    {
      invariantKind: "departure",
      statement: "A domain the change takes away is passed over.",
    },
    {
      invariantKind: "departure",
      statement: "A parent the change takes away leaves the parts it named judged.",
    },
    {
      invariantKind: "departure",
      statement:
        "Those parts are looked for in the body the change withdrew and not among the pages the change carries.",
    },
    {
      invariantKind: "gap",
      statement:
        "Every page standing under `domain` is reached by reading down from `akasha-system`.",
    },
    {
      invariantKind: "upkeep",
      statement: "A page arriving under no parent is refused before it lands.",
    },
  ],
} as const satisfies Check
