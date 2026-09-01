import type { Finding } from "../finding.page-type.ts"

export const anErrorBoundaryNeedsAClassAndAkashaRefusesOne = {
  id: "01a05c48-f6e1-7a47-9add-1a5bd3afb847",
  pageTypeSlug: "finding",
  slug: "an-error-boundary-needs-a-class-and-akasha-refuses-one",
  domainSlug: "domain/design",
  claim:
    "One of the thirty-eight design-patterns modules cannot stand in akasha: a React error boundary is a class, and `no-class` lets through only a class extending `Error`. The other thirty-seven landed and `query-error-boundary` was left behind in shared.",
  evidence:
    '`shared/design-patterns/src/components/query-error-boundary.tsx` declares `class QueryErrorBoundary extends React.Component`. React offers no function form: `getDerivedStateFromError` and `componentDidCatch` are class-only in React 19, and no hook stands for them. `no-class.code-check.code.ts` permits a class only where `!one.expression && one.extending === "Error"`, so `React.Component` is refused, and `change-walking.module.code.ts` has `textNamed` accept `.tsx` as well as `.ts`, so the check does reach the file.\n\nFive files reach it, all under temper: `player-economics-ui/src/shopping-page-content.tsx`, `player-inventory-management-ui/src/inventory-page-content.tsx`, and three under `temper/web/app/components`. It wraps live query content, so dropping it changes what a reader sees when a query throws.\n\nThe two ways out both cost something Alan should choose. Adding `react-error-boundary` would let the boundary be a function, but it is a new npm dependency, it is not installed today, and the lockfile is contended. Widening `no-class` to let a `React.Component` through weakens a rule that holds everywhere else, and no other class stands in akasha to justify it.\n\nWhat was done instead was to leave `shared/design-patterns` standing as a one-module package holding only this file. Its five reaches are unchanged. The rest of the package is now `@akasha/design-patterns` with thirty-seven modules and no barrel.',
} as const satisfies Finding
