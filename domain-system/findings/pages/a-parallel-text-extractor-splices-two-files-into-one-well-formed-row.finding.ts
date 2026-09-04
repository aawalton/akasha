import type { Finding } from "../finding.page-type.ts"

export const aParallelTextExtractorSplicesTwoFilesIntoOneWellFormedRow = {
  id: "01a06751-3543-75b4-bc0b-6a740270b51d",
  pageTypeSlug: "finding",
  slug: "a-parallel-text-extractor-splices-two-files-into-one-well-formed-row",
  domainSlug: "domain/akasha-migration",
  claim:
    "A field extractor run under `xargs -P` interleaves its parallel writes mid-line, so an index built that way holds rows spliced from two different files. The spliced row is well formed: it carries the right field count and plausible values in every field, so a seeded fault, a field check and a byte comparison all report it clean. Lanes are extracting fields from tens of thousands of files this way while the migration runs, and an index is what a lane decides ablations on.",
  evidence:
    "Measured 2026-09-03 while taking a census of the small page families.\n\nI built an index of every page under `akasha/` as pageTypeSlug, slug and path, over about 125,000 TypeScript files, with `find akasha -name '*.ts' -print0 | xargs -0 -P 8 -n 200 awk '...'`. I then seeded a probe against a page I knew: the row for the `akasha` seat came back as `seat`, `akasha`, `akasha/seat-sansport-ember-2026-09-02`.\n\nThat third field is not a path in this repository. It is the head of `akasha/seat-system/seats/pages/akasha.seat.ts` joined to the tail of `akasha/seat-system/seat-log-days/pages/supervisor-transport-ember-2026-09-02.seat-log-day.ts`, two files that were being written by different awk processes at the same moment. Re-running the identical extractor with `-P 8` removed gave `akasha/seat-system/seats/pages/akasha.seat.ts`. The parallel run yielded 61,921 rows and the serial run 61,922.\n\nWhat makes this worse than an ordinary miscount is that the splice is invisible to every check I would normally reach for. The row had three fields, as every row does. Its page type was real and its slug was real. I noticed only because I had seeded a probe for a page whose path I could recite from memory, and a path is the one field long enough for a splice to look wrong in. Two slugs spliced, or two page types, would have read as an ordinary row.\n\nA write under the pipe buffer size is atomic, so a small tree gives no fault at all and the defect appears only at the scale where it costs the most.",
} as const satisfies Finding
