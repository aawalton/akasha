import type { CheckCode } from "akasha/check/code/check-code.page-type.types.ts"

export const noClass = {
  id: "01a04bc8-6c37-77b0-9ff6-5922a789c962",
  type: "check-code",
  slug: "no-class",
  definition: "the check refusing a class that is neither an error type nor a React error boundary",
  runsOnChange: true,
  runsOnDeploy: true,
  runsOnAudit: true,
  invariants: [
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A class extending `Error` is let through.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement:
        "A class extending `React.Component` that declares `static getDerivedStateFromError` is let through.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A class extending a bare `Component` is let through on the same terms.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A class a type declaration holds is let through.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A class the lua runtime library has is let through.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The types that library defines are the ECMAScript runtime's own rather than a domain's.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A class extending `React.Component` that declares no `static getDerivedStateFromError` is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "`componentDidCatch` alone lets no class through.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A class expression is judged wherever a declaration would be.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A class expression is never let through.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The name a class extends is judged as written rather than by the type that name resolves to.",
    },
  ],
  check: { maxCpuSeconds: 1 },
  audit: { maxCpuSeconds: 15 },
} as const satisfies CheckCode
