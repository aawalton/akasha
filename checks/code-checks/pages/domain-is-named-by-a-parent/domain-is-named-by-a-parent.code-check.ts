import type { CodeCheck } from "../../code-check.page-type.ts"

export const domainIsNamedByAParent = {
  id: "01a04d5f-c731-7000-9066-3abf317a1d58",
  pageTypeSlug: "code-check",
  slug: "domain-is-named-by-a-parent",
  definition: "the check refusing a domain the whole does not reach by exactly one chain of parts",
  code: "ts",
  test: "ts",
  runsOnPatch: true,
  runsOnWorktree: false,
  runsOnDeploy: false,
  runsOnAudit: false,
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "Every page whose page type sits under `domain` is judged rather than a `domain` page alone.",
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
        "What names a page judged is one directory listed on the index as the change leaves the index.",
    },
    {
      invariantKind: "departure",
      statement: "`domain/akasha` alone is passed over.",
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
      statement: "A page stating no `id` is refused in words beside this check in every phase.",
    },
    {
      invariantKind: "absence",
      statement: "A body that will not load is refused in words beside this check in every phase.",
    },
    {
      invariantKind: "departure",
      statement: "A domain the change takes away is passed over.",
    },
    {
      invariantKind: "departure",
      statement: "A parent the change takes away leaves the parts the parent named judged.",
    },
    {
      invariantKind: "departure",
      statement:
        "Those parts are looked for in the withdrawn body rather than among the change's own pages.",
    },
    {
      invariantKind: "departure",
      statement: "A page no page names among its parts is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A page more than one page names among its parts is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A page whose parents loop rather than reaching `domain/akasha` is refused.",
    },
    {
      invariantKind: "upkeep",
      statement: "A page arriving under no parent is refused before the page lands.",
    },
  ],
} as const satisfies CodeCheck
