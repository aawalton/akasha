import type { Finding } from "../finding.page-type.types.ts"

export const aTakeDownRacingAnotherLandingOrphansTheSubagentPageItCouldNotRead = {
  id: "01a08cb3-b2c7-7fa0-a75c-f5632d567f18",
  pageTypeSlug: "finding",
  type: "finding",
  slug: "a-take-down-racing-another-landing-orphans-the-subagent-page-it-could-not-read",
  domain: "domain/seat-system",
  claim:
    "A subagent's take-down is asked for again only where the refusal names the landing lock. A landing that refused because the tree moved between the read and the write is just as transient and is answered at once, so the subagent returns, nothing asks again, and its page is left where it is with no subagent behind it. The busier the repository, the more often this fires, and every page it leaves keeps a folder of pages from ever emptying.",
  evidence:
    "Seen 2026-09-10 on the akasha checkout at HEAD, in this seat's own log at `/run/user/1000/akasha/01a07c15-3e52-7000-ad7b-1c746247704d/subagent-presence.log`:\n\n`take akasha a4b5cb0ce84db4e59 — seat-system/subagents/pages/akasha-a4b5cb0ce84db4e59/akasha-a4b5cb0ce84db4e59.subagent.ts — read against 6c52c8c002f, and what is at a83aed6bbf5 is not what was read, so writing it would put back what moved in between`\n\nThe subagent had returned. The page was on disk minutes later.\n\nWhy nothing asked again. `worthAnotherTry` at `subagent-presence.module.code.ts` answers `why.includes(LOCK_HELD)`, and `LOCK_HELD` is `akasha-landing.lock`. The freshness refusal names no lock, so `landingAgain` gives up after the first ask. The module page says that a landing another landing's lock refused is asked for again and that a refusal naming no lock is answered at once; the second of those was written for a refusal the caller cannot mend, and this one is mended by reading again.\n\nWhat I did not settle. Whether the phrase to match on belongs in `subagent-presence` at all, since spelling another module's refusal text here is a second spelling of it. The freshness refusal is composed elsewhere and nothing exports what it says.",
} as const satisfies Finding
