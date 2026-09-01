import type { Finding } from "../finding.page-type.ts"

export const whenATestflightCutIsOwedIsNoLongerWrittenDownAnywhere = {
  id: "01a05e1e-a6c5-716f-8f26-a6c75bb43081",
  pageTypeSlug: "finding",
  slug: "when-a-testflight-cut-is-owed-is-no-longer-written-down-anywhere",
  domainSlug: "domain/harness",
  claim:
    "The rules deciding when a TestFlight cut is owed left the tree with the akasha cut-fingerprint module, because they were written only on that module's page and the copy the cut path actually runs carries none of them.",
  evidence:
    "`a86ab2b802` severed mobile-cli from `@shared/pages-query` by deleting `akasha/mobile-cli/cut-fingerprint/`, on the ground that it reads `mobile-cut`, a page type not moving into akasha, and that its live copy is already outside. Both halves of that are true, and nothing imported the akasha copy, so no behaviour changed.\n\nWhat went with it was the module page. It recorded five invariants: that a cut fingerprint is kept as a `mobile-cut` page rather than in a file; that the last cut is the `mobile-cut` page carrying the highest build number; that a fingerprint carrying no build input tree hash predates the basis cuts are judged by; that a cut is owed where the current build input tree hash differs from the last cut's; and that a newest cut page which will not parse raises rather than reading as no cut.\n\n`alanwalton/mobile-cli/src/lib/cut-fingerprint.ts` implements all five and states none. Whoever next asks why a cut was or was not owed has the code and no page. The invariants are recoverable from `a86ab2b802^`.",
} as const satisfies Finding
