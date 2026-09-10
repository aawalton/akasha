import type { CodeCheck } from "../../code-check.page-type.ts"

export const noEnumOrNamespace = {
  id: "01a04bc8-6c55-748f-89e3-72c3b8da2444",
  pageTypeSlug: "code-check",
  type: "code-check",
  slug: "no-enum-or-namespace",
  definition: "the check refusing an enum or a named namespace",
  runsOnPatch: true,
  runsOnWorktree: false,
  runsOnDeploy: false,
  runsOnAudit: false,
  invariants: [
    {
      invariantKind: "absence",
      statement: "A declaration about a package is left out.",
    },
    {
      invariantKind: "absence",
      statement: "`declare global` is left alone.",
    },
    {
      invariantKind: "absence",
      statement: "An enum or a namespace a type declaration holds is left out.",
    },
    {
      invariantKind: "departure",
      statement: "An enum and a namespace are one check.",
    },
  ],
} as const satisfies CodeCheck
