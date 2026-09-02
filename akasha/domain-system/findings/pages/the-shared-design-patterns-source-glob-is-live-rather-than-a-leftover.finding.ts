import type { Finding } from "../finding.page-type.ts"

export const theSharedDesignPatternsSourceGlobIsLiveRatherThanALeftover = {
  id: "01a061a4-8b79-7000-9339-d8f7af9ed35c",
  pageTypeSlug: "finding",
  slug: "the-shared-design-patterns-source-glob-is-live-rather-than-a-leftover",
  domainSlug: "domain/design",
  claim:
    'The seven `@source "../../../shared/design-patterns/src/**/*.{ts,tsx}"` globs read as leftovers, because the folder they cover holds one file whose thirty-seven siblings moved to akasha. They are live. Removing them alone costs 38 bytes of emitted CSS in six of the seven stylesheets: the `.static` rule, which the scanner reads out of the `static getDerivedStateFromError` keyword. Tailwind raises nothing when a glob stops matching; it emits less.',
  evidence:
    "Measured 2026-09-02 by compiling each product's `globals.css` as the Tailwind v4 vite plugin does: `compile()` from `@tailwindcss/node` to resolve `@import` and `@source`, a `@tailwindcss/oxide` `Scanner` over the sources that returns, then `build()` over the scanned candidates.\n\nControl, every sheet scanning the file at its shared path: atlas-web 125455, web/app-capacitor 132293, web/app 131738, archive-of-worlds 125455, audhdalan 117353, smilingjenny 117353, temper/web 165260.\n\nWith only the shared glob removed, six fell by exactly 38, to 125417, 131700, 125417, 117315, 117315 and 165222. `alanwalton/web/app-capacitor` held at 132293, because another file in its wider scan set also carries the token `static`. That one sheet showing no change is why a single-product check would have reported this safe.\n\nIsolated by scanning the file by itself: it yields 30 candidates, of which exactly one, `static`, is supplied by nothing else in the tree. Diffing the emitted sheets, the only lines present with the file are `  .static {` and `    position: static;`.\n\nThe rule is an artifact, a TypeScript keyword read as a utility name rather than a class anybody wrote. It is emitted CSS all the same, and `.static` sets `position: static`, so losing it can move a positioned element.\n\nEach sheet already names `akasha/design/design-patterns` on the line below, so the akasha half is covered. Only the one file is at stake, and it cannot move while `no-class` refuses it.",
} as const satisfies Finding
