import type { Finding } from "../finding.page-type.ts"

export const aTwinMatchingTheLegacyTipCanHoldLessProofThanThePackageOnceHad = {
  id: "01a0639e-f448-758f-9b7d-4ab0a21d0967",
  pageTypeSlug: "finding",
  slug: "a-twin-matching-the-legacy-tip-can-hold-less-proof-than-the-package-once-had",
  domainSlug: "domain/temper",
  claim:
    "A twin measured against the legacy package as it is at the tip can read complete while holding less proof than that package once held, because a commit about something else had already deleted the legacy tests. Weighed at the tip the two agreed at zero tests; weighed against the commit before, thirteen were missing from the twin. A recreation's coverage is owed against the predecessor's fullest state rather than its last one.",
  evidence:
    "`temper/player-quests-addon` tracked 16 files and no test when this seat read it, and `akasha/temper/temper-quests-addon` carried two test files. Comparing the two at the tip answers agreement, and the ablation would have taken no test with it.\n\n`09f964f5c5` (2026-08-30 10:52:59 -0600), whose message is about ablating the task pages and the conditional reading that named them, deleted seven test files and 586 lines from the legacy package: `src/auto-quest/chatter-names.unit.test.ts`, `src/auto-quest/trace-buffer.unit.test.ts`, `src/saved-variables.unit.test.ts`, and four under `src/auto-quest/reconcile-auto-quest/`. The twin landed at `fac243c9ad` (2026-09-02 12:42:47 -0600), three days later, so no seat recreating the package could see them.\n\nThe four `reconcile-auto-quest` tests and the saved-variables one have twin equivalents in `quests-decide.module.test.ts` and `quests-saved-variables.module.test.ts`. Two did not. `quests-chatter-names` and `quests-trace-buffer` each declared invariants on their page with nothing proving them, seven and six tests having gone. Fourteen replacements landed at `f1230012ea` before the ablation at `9d66855772`.\n\nThree findings record the same commit taking tests from other packages, so the shape recurs: `three-catalog-unit-tests-fell-out-with-the-task-pages`, `the-classify-item-tests-were-deleted-before-the-package-reached-akasha` and `the-spotify-clients-whole-test-suite-went-in-a-commit-about-task-pages`.",
} as const satisfies Finding
