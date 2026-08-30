import type { Check } from "../check.page-type.ts"

export const noMethodSignature = {
  id: "01a04bc8-6c64-7482-a9b8-f0d6e14e546d",
  pageTypeSlug: "check",
  slug: "no-method-signature",
  definition: "the check refusing a method signature in an interface or a type literal",
  code: "ts",
  test: "ts",
  runsOnPatch: true,
  runsOnWorktree: true,
  runsOnDeploy: true,
  runsOnAudit: true,
  invariants: [
    {
      invariantKind: "absence",
      statement: "A call or construct or index signature is left out.",
    },
    {
      invariantKind: "absence",
      statement: "So is a method written out rather than declared.",
    },
    {
      invariantKind: "departure",
      statement: "The method form is refused and the function-type property is not.",
    },
  ],
} as const satisfies Check
