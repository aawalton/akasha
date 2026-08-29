import type { Finding } from "../finding.page-type.ts"

export const aDroppedFilePropertyOrphansItsFile = {
  id: "01a04d9d-bc95-7f8f-be11-136be2877243",
  pageTypeSlug: "finding",
  slug: "a-dropped-file-property-orphans-its-file",
  domainSlug: "domain/checks-system",
  claim:
    "A page that stops stating an optional file property leaves that file standing on disk with nothing claiming it, and no check fires.",
  evidence:
    "Take `test: \"ts\"` off a page and leave the `.test.ts` beside it. `file-has-its-page` walks `leaving.changed`, and the file is not in it — the change names only the page — so the check never looks at it. `page-property-has-its-file` derives what to look for from `pathsOf` over the page's new value, which no longer names a test, so it has nothing to compare and nothing to say. Run for real against `page-address.module.ts` with that one line removed, the gate answered `13 checks passed over the 1 path asked for`. On the next reindex no page claims the file, so no `identity/page/path` entry stands for it, so `everyFileIn` does not enumerate it and the audit stops judging it: it is not refused, it drops out. `code` is required by the `Module` type so the compiler blocks that half; `test` is declared `test?: Test` and is not. The pair of checks that landed today are each sound about the direction they watch, and the correspondence has a third direction neither covers — what the page used to claim. The index already answers it, `identity/page/path/akasha/pages-system/page/page-address.module.test.ts.jsonl` naming the page that claims it today, one read from any check holding the page's path. Recorded rather than fixed because which check owns that third direction, and whether it belongs beside `page-property-has-its-file` or stands on its own, is a shape decision about the pair that has just landed.",
} as const satisfies Finding
