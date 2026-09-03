import type { Finding } from "../finding.page-type.ts"

export const roofNeverMeasured = {
  id: "01a06555-9f3e-7261-b4a1-7d5672abb36d",
  pageTypeSlug: "finding",
  slug: "roof-never-measured",
  domainSlug: "domain/all-about-alan",
  claim:
    "Every PV size in `projects/solar-power` rests on a roof nobody has measured. The working assumption is ~1,500 sq ft usable; the planning case is 49 kWp DC, which the thread's own anchor puts at ~2,905 sq ft. The gap is carried as a $22,500 supplement structure budgeted against the unmeasured input rather than against a measured shortfall. Azimuth, tilt, shaded fraction and usable area per face are each named as needed, and none is recorded anywhere in the thread.",
  evidence:
    'Read 2026-08-16 across the 41 files of `all-about-alan/projects/solar-power`.\n\n`scope.md`: "Roof measurements (azimuth per face, tilt, usable area, shading) — gates the bid stage. Working assumption: ~1,500 sq ft usable."\n\n`sizing/pv.md` prefaces its derate stack "assumptions are placeholders until the roof study; refresh once measurements land", needs 2,905 sq ft for 49 kWp at its 5.5 m²/kWp anchor against "~900–1,500 sq ft of high-yield roof", and rules "**Will not fit on house roof alone**". Its answer: "assume the house roof alone hosts ~25–35 kWp at best … until then, **budget for at least one supplement structure in the bid scope**."\n\n`sizing/cost.md` carries that budget as a line — "Supplement structure (pergola or ground-mount) … | $0 | $22,500 | $34,500" — and ranks it first in what moves the cost: "if measured roof area fits 49 kWp directly, the $22,500 … line goes to zero. **−$22,500 (−11%)**."\n\n`sizing/recommendation.md` ranks the roof study first of four open items, "**Highest priority.**", and fourth of nine levers: "**Get the roof study early.**"\n\n`efficiency-factors/provo.md` heads five measurements Alan needs with "Azimuth of each candidate roof face … 15° error → ~3% energy error"; `efficiency-factors/orientation.md` repeats three under "Alan\'s value (when measurements arrive)".\n\nNot measured: I did not visit the site, open any survey, satellite image or county record, and did not run PVWatts. What I checked is that no file records a measured azimuth, tilt, shaded fraction or usable area — every occurrence is a request for one or a placeholder standing in for one.',
} as const satisfies Finding
