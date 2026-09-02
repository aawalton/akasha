import type { Finding } from "../finding.page-type.ts"

export const zeroRowsDroppedTodayIsADateNotAProperty = {
  id: "01a061e6-6cf1-7184-8696-69d961bcd708",
  pageTypeSlug: "finding",
  slug: "zero-rows-dropped-today-is-a-date-not-a-property",
  domainSlug: "domain/temper",
  claim:
    "Five reshaping helpers in the addon-data page bridge skip a row whose shape they do not recognise rather than refusing it, and no count downstream can see a row that was never emitted. Today they skip nothing: 875 entry rows reached across 16 reshaped page types, 0 skipped. Zero today is a measurement with a date on it rather than a property of the code.",
  evidence:
    "Measured 2026-09-02 in `tools/lib/temper-addon-data/catalog-sidecars.ts`. Four helpers there — `entriesIn`, `scriptsOf`, and the two quality shapers — and `idsIn`, which this seat added while mending the grimoire section, each `continue` past a value whose shape they do not recognise. `idsIn` reads `scriptId` off an object and skips the object when it is absent. `entriesIn` skips a sidecar row it cannot read as an object. The quality shapers skip a row missing either half of its quality and value.\n\nThe census reached every page type the bridge reshapes: 875 entry rows across 16 page types, 0 skipped as non-object, 0 skipped for no `scriptId`, 0 skipped for no quality pair. The exposure is latent rather than live.\n\nNot hardened, deliberately. There is no failing case to hold a mend to, and a guard would have to invent what a row with no `scriptId` is supposed to mean. Hardening four sites nothing is failing at is how a seat lands a defect while tidying. What holds this meanwhile is the byte comparison over all 48 emitted files, which catches any skip the pipeline actually makes — but only across the page types it already emits.\n\nWhat a later seat needs from this is that the number is dated. A page type reshaped after today, or a sidecar row that gains a shape these five do not know, is skipped with no message and no count, and the file it should have reached still emits and still compares equal to a disk copy generated the same way. The cheap check is to re-run the census, counting rows in against rows out for each of the five, rather than to read the helpers.",
} as const satisfies Finding
