import type { CodeCheck } from "../../code-check.page-type.ts"

export const noClass = {
  id: "01a04bc8-6c37-77b0-9ff6-5922a789c962",
  pageTypeSlug: "code-check",
  type: "code-check",
  slug: "no-class",
  definition: "the check refusing a class that is neither an error type nor a React error boundary",
  runsOnPatch: true,
  runsOnWorktree: false,
  runsOnDeploy: false,
  runsOnAudit: false,
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
      statement: "A class a type declaration holds is let through.",
    },
    {
      invariantKind: "departure",
      statement: "A class the lua runtime library has is let through.",
    },
    {
      invariantKind: "departure",
      statement:
        "The types that library defines are the ECMAScript runtime's own rather than a domain's.",
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
        "The name a class extends is judged as written rather than by the type that name resolves to.",
    },
  ],
} as const satisfies CodeCheck
