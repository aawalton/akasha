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
        "Every page whose page type stands under `domain` is judged, not only one whose own page type is `domain`.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page type the change itself puts under `domain` counts, because which page types stand under `domain` is read from the index as the change leaves it.",
    },
    {
      invariantKind: "departure",
      statement:
        "The page is found from its path and the page types the index holds, never by walking.",
    },
    {
      invariantKind: "absence",
      statement:
        "The body of the page judged is not read. The body a change replaces is, because the parts that body named are the pages the change may have orphaned.",
    },
    {
      invariantKind: "departure",
      statement:
        "Whether a page names it is one directory listed on the index as the change leaves it, so a parent landing in the change and one the change withdraws are answered by the same lookup.",
    },
    {
      invariantKind: "departure",
      statement:
        "`domain/akasha-system` alone is passed over, as the one page standing under none.",
    },
    {
      invariantKind: "departure",
      statement:
        "An index answering other than one page to the slug is passed over, not thrown on, because a check that throws leaves every other page in the change unjudged.",
    },
    {
      invariantKind: "absence",
      statement:
        "Why the index answers none or two is not said here. A page stating no `id`, a body that will not load, a file named otherwise than its slug and a slug two pages carry are refused in words beside this.",
    },
    {
      invariantKind: "departure",
      statement: "A domain the change takes away is passed over.",
    },
    {
      invariantKind: "departure",
      statement:
        "A parent the change takes away leaves the parts it named judged, because those parts are looked for in the body the change withdrew and not among the pages the change carries.",
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
