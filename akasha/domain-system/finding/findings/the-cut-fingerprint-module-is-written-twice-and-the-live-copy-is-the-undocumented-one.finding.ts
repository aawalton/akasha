import type { Finding } from "../finding.page-type.ts"

export const theCutFingerprintModuleIsWrittenTwiceAndTheLiveCopyIsTheUndocumentedOne = {
  id: "01a05e1d-7b84-7f13-8d31-a4584e8df910",
  pageTypeSlug: "finding",
  slug: "the-cut-fingerprint-module-is-written-twice-and-the-live-copy-is-the-undocumented-one",
  domainSlug: "domain/harness",
  claim:
    "The cut fingerprint code is written in two places, and the copy the cut path actually runs is the one carrying no page, so the akasha copy documents a mechanism it does not drive.",
  evidence:
    "`akasha/mobile-cli/cut-fingerprint/cut-fingerprint.module.code.ts` and `alanwalton/mobile-cli/src/lib/cut-fingerprint.ts` hold the same code, differing only where one wraps a line the other does not. `tools/lib/mobile-code.ts` imports the second by relative path, so `tools/commands/mobile/cut-status.ts` and `tools/lib/mobile-testflight-cut.ts` run that one. Nothing imports the akasha copy.\n\nSo the akasha copy is dead and reaches `@shared/pages-query`, which would make deleting it the cheap way to cut one dependency. It was kept instead, because its module page states five invariants nothing else records, among them that a cut is owed where the build input tree hash differs from the last cut's. Deleting the file would delete the only place that is written down.\n\nThe fix is the other direction: point `tools/lib/mobile-code.ts` at `@akasha/mobile-cli/cut-fingerprint` and delete the copy under `alanwalton/`. That was not done here because it lands on the path a TestFlight cut runs through.",
} as const satisfies Finding
