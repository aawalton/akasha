import type { Finding } from "../finding.page-type.ts"

export const designSystemCarriesItsDependentsInCssAndItsBlockersInTsx = {
  id: "01a05c50-e3b4-7116-ab2b-5f96eaec8f77",
  pageTypeSlug: "finding",
  slug: "design-system-carries-its-dependents-in-css-and-its-blockers-in-tsx",
  domainSlug: "domain/design",
  claim:
    "shared/design-system cannot land whole today. Thirteen typecheck errors stand in four of its 36 `.tsx`, every one a React setter handed to a prop the landed akasha design packages type `(value: string) => undefined`, which the no-void-return narrowing another lane holds is what fixes. Its two halves are unlike: seven products reach only its five `.css`, and one route on one site reaches the whole 36-file demo gallery.",
  evidence:
    'Counted rather than carried over: 41 source files, 36 `.tsx` and 5 `.css`, 5365 lines, largest `layout-tab.tsx` at 14748 bytes and so under the ceiling, and no tracked `.ts`. `@shared/utils-test` and `@types/bun` are dead as briefed, the package holding no test file and spelling no `bun:` specifier, so both go when it lands. Two counts handed to this lane are wrong. There are three index paths rather than two: `brand-tab/index.tsx`, `tokens-tab/index.tsx` and `styles/index.css`, and the third is both the file carrying the fontsource reaches and the name seven products spell. And the typecheck blocker is four files rather than one: components-selection-panels 6, components-input-composite-panels 5, components-input-panels 1, components-list-grid-panels 1, all TS2322. Inbound is 18 files rather than 20: 10 name it in a `package.json`, 7 are a `.css` spelling `@import "@shared/design-system/styles.css"`, and exactly one, alanwalton/web/app/routes/design.tsx, reaches the `.tsx` at all. So every outside dependent rests on the stylesheet half, which declares nothing a compiler types and carries no blocker, while all thirteen errors, both `.tsx` index paths and 36 of the 41 files sit in the half one route renders. Whoever takes this lands the stylesheets first and the gallery behind the rule.',
} as const satisfies Finding
