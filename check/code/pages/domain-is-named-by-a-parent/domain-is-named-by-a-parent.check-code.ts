import type { CheckCode } from "akasha/check/code/check-code.page-type.types.ts"

export const domainIsNamedByAParent = {
  id: "01a04d5f-c731-7000-9066-3abf317a1d58",
  type: "page-type/check-code",
  slug: "domain-is-named-by-a-parent",
  definition: "the check refusing a domain the whole does not reach by exactly one chain of parts",
  runsOnChange: true,
  runsOnDeploy: true,
  runsOnAudit: true,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every page whose page type sits under `domain` is judged rather than a `domain` page alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page type the change itself puts under `domain` counts.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The page is found from its path and the page types the index holds rather than by walking.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "The body of the page judged is not read.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "The body a change replaces is read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "What names a page judged is one directory listed on the index as the change leaves the index.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "`domain/akasha` alone is passed over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Which page sits at a path is read from the body at that path.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An id the index files no page for is passed over rather than thrown on.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Why nothing is filed for an id is not said here.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A page stating no `id` is refused in words beside this check in every phase.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A body that will not load is refused in words beside this check in every phase.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A domain the change takes away is passed over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A parent the change takes away leaves the parts the parent named judged.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Those parts are looked for in the withdrawn body rather than among the change's own pages.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page no page names among its parts is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page more than one page names among its parts is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page whose parents loop rather than reaching `domain/akasha` is refused.",
    },
    {
      decisionKind: "decision-kind/upkeep",
      statement: "A page arriving under no parent is refused before the page lands.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The pages above a page are answered by a predicate rather than climbed here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The namers counted and the loop read come from one closure.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reference naming a page without an id is a namer of that page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "`parts` and `part-slugs` are followed together rather than as a fallback.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One page naming a page twice among its parts is one namer.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every page above is followed rather than the first namer alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An id the index files no page for is refused as a page no page names.",
    },
  ],
  check: { maxCpuSeconds: 10 },
  audit: { maxCpuSeconds: 15 },
} as const satisfies CheckCode
