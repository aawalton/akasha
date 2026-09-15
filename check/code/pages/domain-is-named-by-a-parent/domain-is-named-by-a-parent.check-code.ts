import type { CheckCode } from "akasha/check/code/check-code.page-type.types.ts"

export const domainIsNamedByAParent = {
  id: "01a04d5f-c731-7000-9066-3abf317a1d58",
  type: "page-type/check-code",
  slug: "domain-is-named-by-a-parent",
  definition: "the check refusing a domain the whole does not reach by exactly one chain of parts",
  runsOnChange: true,
  runsOnDeploy: true,
  runsOnAudit: true,
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Every page whose page type sits under `domain` is judged rather than a `domain` page alone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page type the change itself puts under `domain` counts.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The page is found from its path and the page types the index holds rather than by walking.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "The body of the page judged is not read.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "The body a change replaces is read.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "What names a page judged is one directory listed on the index as the change leaves the index.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "`domain/akasha` alone is passed over.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Which page sits at a path is read from the body at that path.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An id the index files no page for is passed over rather than thrown on.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Why nothing is filed for an id is not said here.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A page stating no `id` is refused in words beside this check in every phase.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A body that will not load is refused in words beside this check in every phase.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A domain the change takes away is passed over.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A parent the change takes away leaves the parts the parent named judged.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Those parts are looked for in the withdrawn body rather than among the change's own pages.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page no page names among its parts is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page more than one page names among its parts is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page whose parents loop rather than reaching `domain/akasha` is refused.",
    },
    {
      invariantKind: "invariant-kind/upkeep",
      statement: "A page arriving under no parent is refused before the page lands.",
    },
  ],
  check: { maxCpuSeconds: 10 },
  audit: { maxCpuSeconds: 15 },
} as const satisfies CheckCode
