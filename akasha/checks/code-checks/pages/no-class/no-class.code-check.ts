import type { CodeCheck } from "../../code-check.page-type.ts"

export const noClass = {
  id: "01a04bc8-6c37-77b0-9ff6-5922a789c962",
  pageTypeSlug: "code-check",
  slug: "no-class",
  definition: "the check refusing a class that is neither an error type nor a React error boundary",
  code: "ts",
  test: "ts",
  runsOnPatch: true,
  runsOnWorktree: true,
  runsOnDeploy: true,
  runsOnAudit: true,
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A class extending `Error` is let through.",
    },
    {
      invariantKind: "constraint",
      statement:
        "A class extending `React.Component` that declares `static getDerivedStateFromError` is let through.",
    },
    {
      invariantKind: "departure",
      statement: "A class extending a bare `Component` is let through on the same terms.",
    },
    {
      invariantKind: "departure",
      statement:
        "A class extending `React.Component` that declares no `static getDerivedStateFromError` is refused.",
    },
    {
      invariantKind: "departure",
      statement: "`componentDidCatch` alone lets no class through.",
    },
    {
      invariantKind: "departure",
      statement: "A class expression is judged wherever a declaration would be.",
    },
    {
      invariantKind: "departure",
      statement: "A class expression is never let through.",
    },
    {
      invariantKind: "departure",
      statement:
        "What a class extends is judged by the name written rather than by what that name resolves to.",
    },
  ],
} as const satisfies CodeCheck
