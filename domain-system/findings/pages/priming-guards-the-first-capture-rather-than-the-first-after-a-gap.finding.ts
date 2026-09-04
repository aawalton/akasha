import type { Finding } from "../finding.page-type.ts"

export const primingGuardsTheFirstCaptureRatherThanTheFirstAfterAGap = {
  id: "01a063cd-1318-796f-98f0-77f3b1df83a2",
  pageTypeSlug: "finding",
  slug: "priming-guards-the-first-capture-rather-than-the-first-after-a-gap",
  domainSlug: "domain/music-listening",
  claim:
    "The rule that a priming run scores no first listen guards only the very first capture, because priming is true where no listen has ever been filed. A capture starting again after a gap is not primed, so every track heard in the gap that no heard track names scores as a first listen and counts into new music minutes, dated to the run rather than to the hearing. Alan has left this as it is and will settle it when he rebuilds the workflow.",
  evidence:
    "`music-capture.command.code.ts` reads `const priming = ledger.newestPlayedAt === null`. Alan's newest filed listen is `2026-08-21T12:31:13.556Z` and the capture was deleted on 1 September, so twelve days went unfiled and the ledger is not empty. The first run will therefore not be primed. What Spotify hands back reaches about fifty plays, so the gap is recoverable only in part either way. `--dry-run` says what would land without writing, and would give the count before any of it is filed.",
} as const satisfies Finding
