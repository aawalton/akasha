import type { CheckCode } from "akasha/check/code/check-code.page-type.types.ts"

export const noEnumOrNamespace = {
  id: "01a04bc8-6c55-748f-89e3-72c3b8da2444",
  type: "check-code",
  slug: "no-enum-or-namespace",
  definition: "the check refusing an enum or a named namespace",
  runsOnChange: true,
  runsOnDeploy: true,
  runsOnAudit: true,
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
  check: { maxCpuSeconds: 10 },
  audit: { maxCpuSeconds: 15 },
} as const satisfies CheckCode
