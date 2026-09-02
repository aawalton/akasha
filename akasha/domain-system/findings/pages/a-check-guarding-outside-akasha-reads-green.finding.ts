import type { Finding } from "../finding.page-type.ts"

export const aCheckGuardingOutsideAkashaReadsGreen = {
  id: "01a0616f-16d5-7816-b749-85208d96fb87",
  pageTypeSlug: "finding",
  slug: "a-check-guarding-outside-akasha-reads-green",
  domainSlug: "domain/akasha-check",
  claim:
    "No akasha check can guard anything outside `akasha/`. Every check is handed the change filtered to paths beginning `akasha/`, so a check written against a path elsewhere gets an empty set on every run and answers that it found nothing wrong. It does not fail. It reads green, and the tree it was written to guard goes unjudged. About four fifths of the tracked files are outside `akasha/`, so the reach a check appears to have is far wider than the reach a check has.",
  evidence:
    "`akasha/checks/modules/change-walking/change-walking.module.code.ts:44` sets `INSIDE` to `akasha/`. Line 115 is `insideAkasha`, a prefix test on it. Lines 119 to 123 are `insideOf`, which filters `change.changed` through that test before any check runs. `akasha/checks/checks.workspace-package.ts:20-32` says the same thing as three invariants, the flattest being that every check is handed the change narrowed to the akasha folder before the check runs, and that a path outside the akasha folder is passed over rather than refused. `akasha audit` describes itself as running over every file the akasha folder holds.\n\nPassed over rather than refused is the trap. A check reads an empty input as a clean one, so its verdict is success. Nothing tells the writer that the check never saw a file, and `runs-on-audit` being true says only that the check was called.\n\nFound while looking for a guard on `pages/package/`, where 13 pages had outlived the workspaces they describe. A code check refusing a package page whose folder holds no `package.json` would have been handed nothing on every run of every phase, and would have reported success forever while the count climbed.\n\nThe reach: 98,468 tracked files, 18,836 of them under `akasha/` and 69,659 under `pages/`. The audits under `tools/audits/` are what cover the rest, and they are the old system's.\n\n`a-move-carries-nothing-into-akasha` records the same boundary at `akasha move`, which refuses a path outside akasha outright. That difference is the whole of this: the command refuses and the check succeeds.",
} as const satisfies Finding
