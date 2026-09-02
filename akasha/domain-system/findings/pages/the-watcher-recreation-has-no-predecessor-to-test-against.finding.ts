import type { Finding } from "../finding.page-type.ts"

export const theWatcherRecreationHasNoPredecessorToTestAgainst = {
  id: "01a0635f-de0f-7fc4-815f-c51b9b4302e4",
  pageTypeSlug: "finding",
  slug: "the-watcher-recreation-has-no-predecessor-to-test-against",
  domainSlug: "domain/temper",
  claim:
    "Every test proving the watcher modules recreated under `akasha/temper/temper-watcher` was written from reading the code being recreated rather than from a passing predecessor. `09f964f5c5` deleted all 27 test files `temper/scripts` held, leaving none, so no original survives to differential-test a recreation against. The green there asserts what one reader understood the code to mean, which is not what green usually warrants.",
  evidence:
    "At `5d99892a`, `temper/scripts` tracks 57 files and 216 exported symbols across 54 `.ts`, and just 2 test files, `completed-day-landing.unit.test.ts` and `net-worth-hour-landing.unit.test.ts`, both added after the ablation by `91e49ac5a6` on 2026-09-01 and neither covering anything recreated so far. `09f964f5c5` (2026-08-30) deleted 27, taking the package from 27 test files to 0, among them `dispatch.unit.test.ts`, `updater.unit.test.ts`, `stable-read.unit.test.ts`, `retry.unit.test.ts`, `run-outcome.unit.test.ts`, `self-write-guard.unit.test.ts`, `upload-retry.unit.test.ts`, `import-inventory.unit.test.ts` and `import-errors-decide.unit.test.ts`; untracked `dist/` still holds their stale `.d.ts`, which is how the deletion was found. The recreations in `b5e70ed23a`, `f6bb7e59f0`, `7e23b73c13` and `a643c3d109` carry 95 passing tests across 14 files, every one newly written. The strongest evidence available is in `watcher-logging`, whose test round-trips each line it writes through the pre-existing `parseWatcherLine` in `watcher-log-line`: that proves the line format against an independent reader already in the tree, but proves nothing about the log rotation, and the `log`, `logError` and `writeFileAtomicWithRetry` I/O paths carry no test at all. The worker was never run, correctly, because it is outward-facing. A seat reading green here should not read it as agreement with the behaviour that ran before.",
} as const satisfies Finding
