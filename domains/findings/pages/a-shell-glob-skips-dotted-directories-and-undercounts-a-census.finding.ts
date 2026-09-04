import type { Finding } from "../finding.page-type.ts"

export const aShellGlobSkipsDottedDirectoriesAndUndercountsACensus = {
  id: "01a0674c-196d-79a3-9ef4-c0d15204d776",
  pageTypeSlug: "finding",
  slug: "a-shell-glob-skips-dotted-directories-and-undercounts-a-census",
  domainSlug: "domain/instrument",
  claim:
    "A shell `*/` glob skips directories whose names open with a dot, so a census written that way omits them silently and reports a plausible total. Counting module pages under `akasha/temper/temper-web` that way gave 289; `find` over the same tree gave 299. The ten it missed sit under `.server/`. Neither number announces itself as wrong.",
  evidence:
    "Found while measuring how many temper-web modules carry a test, not while looking for a glob defect.\n\nThe first count walked `akasha/temper/temper-web/*/` in bash, keeping each directory holding `<slug>/<slug>.module.ts`. It answered 289 pages, 12 with a `.module.test.*`. A second count with `find -name '*.module.ts'` answered 299. The ten between them sit under `akasha/temper/temper-web/.server/`, among them answer-ask, character-import, supabase-service-client and watcher-dir. Bash `*` does not match a leading dot, so the loop never saw that directory and reported no trouble.\n\nReconciled across all 299: 12 carry a test, 287 do not.\n\nTwo of those 12, companion-rotation-outcome and companion-stats-panel-state, were carried in by an earlier lane rather than written in the W3 slice.\n\nThe defect is worth more than the figure. 289 and 299 are both well formed and believable, and nothing in the first run signalled anything; what separated them was a second instrument of a different mechanism disagreeing. `akasha/alan/web/.server/` is another dotted directory here, so other censuses taken with a glob may be under-reporting silently.\n\nBefore believing either count I checked the sorting fired both ways: armor-card sorts as no-test, companion-rotation-outcome as with-test, and a slug that does not exist is skipped rather than counted.\n\nFiled rather than acted on: coverage is no intent of this migration.",
} as const satisfies Finding
