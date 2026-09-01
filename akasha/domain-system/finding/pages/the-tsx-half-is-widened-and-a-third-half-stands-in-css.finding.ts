import type { Finding } from "../finding.page-type.ts"

export const theTsxHalfIsWidenedAndAThirdHalfStandsInCss = {
  id: "01a05c40-0386-7a34-ba85-f73dc613a54f",
  pageTypeSlug: "finding",
  slug: "the-tsx-half-is-widened-and-a-third-half-stands-in-css",
  domainSlug: "domain/akasha-check",
  claim:
    "The widening half of manifest-names-what-is-reached is landed: `holdingBy` takes `.tsx` as well as `.ts`, and audit refuses exactly what it refused before. The three landed design packages now name all sixteen third-party packages their `.tsx` reaches. design-system is held back by a third half nobody had told apart: two of its dependencies are reached only from a `.css`, which the check reads not at all, so widening `.tsx` alone still leaves it refused two rather than none.",
  evidence:
    "`holdingBy` read `TS_ENDING` and now reads `textNamed`, which change-walking already exported as `.ts` or `.tsx`; the other reading, the one guarding `unnamedIn`, stands, so the reached-but-unnamed half is untouched. Audit before: 21 refusals, 11 of them this check and all `@capacitor`. Audit after: 13, the same 11, the fall being eight ssh duplications another lane landed meanwhile. No refusal was added, as the monotonicity argument said. The omission counts held: design-badges 5, design-forms 7, design-layout 4. Naming them was possible only after the widening, since the named-but-unreached half would have refused each. Two names beyond the sixteen went in too: design-badges and design-forms each reach `@shared/design-primitives`, which is no akasha package and so exempt from neither half; design-layout already named it. What was believed of design-system is wrong twice. It holds 36 `.tsx`, 5 `.css` and no `.ts`, which is right, but the check would have refused it nine dependencies rather than ten, and after the widening refuses four: `@fontsource-variable/geist`, its `-mono`, `@shared/utils-test` and `@types/bun`. The last two are dead — the package holds no test file and spells no `bun:` specifier — and go when it lands. The first two are truly reached, from `src/styles/index.css` alone, by one `@import` and five `url()` calls. The check reads no `.css`, so a package taking its fonts through a stylesheet cannot name them. Nothing in the 41 files is over the 15000 byte ceiling.",
} as const satisfies Finding
