import type { CodeCheck } from "akasha/checks/code-checks/code-check.page-type.types.ts"

export const noMethodSignature = {
  id: "01a04bc8-6c64-7482-a9b8-f0d6e14e546d",
  type: "code-check",
  slug: "no-method-signature",
  definition: "the check refusing a method signature in an interface or a type literal",
  runsOnChange: true,
  runsOnDeploy: true,
  runsOnWorktree: false,
  runsOnAudit: true,
  invariants: [
    {
      invariantKind: "absence",
      statement: "A call signature is left out.",
    },
    {
      invariantKind: "absence",
      statement: "A construct signature is left out.",
    },
    {
      invariantKind: "absence",
      statement: "An index signature is left out.",
    },
    {
      invariantKind: "absence",
      statement: "So is a method written out rather than declared.",
    },
    {
      invariantKind: "departure",
      statement: "The method form is refused and the function-type property is not.",
    },
    {
      invariantKind: "departure",
      statement: "A file named `.d.ts` is passed over.",
    },
    {
      invariantKind: "departure",
      statement:
        "A declaration file names a shape another language or another writer already named.",
    },
  ],
  check: { maxCpuSeconds: 10 },
  audit: { maxCpuSeconds: 15 },
} as const satisfies CodeCheck
