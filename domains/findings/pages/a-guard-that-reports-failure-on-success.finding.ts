import type { Finding } from "../finding.page-type.ts"

export const aGuardThatReportsFailureOnSuccess = {
  id: "01a06805-e2b9-7003-82f0-00b58b37ce61",
  pageTypeSlug: "finding",
  slug: "a-guard-that-reports-failure-on-success",
  domainSlug: "workspace-package/lua-compiler",
  claim:
    "An ablation script closed with `[ -e lua-compiler ] && { echo ...; exit 1; }` under `set -e`. Where the path is correctly absent the test returns 1, the `&&` short-circuits, and the script exits non-zero — announcing failure after the removal it guards had already succeeded. This is the inverse of `table.getn` announcing success after a failure, and the two faults share one root: an instrument nobody tried against the outcome it exists to detect.",
  evidence:
    "Found by reading the script again before running it, not by running it. The fix is an `if` block, together with a second check that `git ls-files lua-compiler` counts nothing, so the guard tests the index as well as the disk. The pair is the useful part. `table.getn` was a detector that answered clean when handed a deliberately broken tree; this was a guard that answered broken when handed a correct one. Neither would have been found by more careful reading of the code, and both were found by asking what the instrument does on the case it was built for. The rule that covers both: try a detector against a seeded wrong result, and try a guard against a seeded right one. The other half is on its own page, `table-getn-tracks-lua-target-not-which-variant-file-was-selected`.",
} as const satisfies Finding
