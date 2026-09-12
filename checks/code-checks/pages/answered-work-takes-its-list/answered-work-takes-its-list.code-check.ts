import type { CodeCheck } from "akasha/checks/code-checks/code-check.page-type.types.ts"

export const answeredWorkTakesItsList = {
  id: "01a095c9-4d3b-7000-84fa-5ac79fac61dd",
  type: "code-check",
  slug: "answered-work-takes-its-list",
  definition: "the check refusing work `answering` runs that takes no list to record what it did",
  runsOnChange: true,
  runsOnDeploy: true,
  runsOnWorktree: false,
  runsOnAudit: true,
  invariants: [
    {
      invariantKind: "departure",
      statement: "`answering` hands its work a list and reads that list where the work throws.",
    },
    {
      invariantKind: "departure",
      statement: "Work taking no parameter leaves that list empty, so the refusal says nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A command that did nothing gives that same refusal, so the two read alike.",
    },
    {
      invariantKind: "departure",
      statement:
        "Work is judged by how many parameters it takes rather than by what it names them.",
    },
    {
      invariantKind: "departure",
      statement: "A parameter under any name at all answers this.",
    },
    {
      invariantKind: "departure",
      statement: "`answering` is found by the name it is taken in under, so an alias is judged.",
    },
    {
      invariantKind: "absence",
      statement: "Work handed to anything else is not judged.",
    },
    {
      invariantKind: "gap",
      statement: "Whether work that does nothing before it throws must take the list is unsettled.",
    },
    {
      invariantKind: "departure",
      statement: "Nothing is judged while this page states `experimental`.",
    },
    {
      invariantKind: "departure",
      statement: "`experimental` comes off this page where Alan has approved this check.",
    },
  ],
  check: { maxCpuSeconds: 10 },
  audit: { maxCpuSeconds: 15 },
  experimental: true,
} as const satisfies CodeCheck
