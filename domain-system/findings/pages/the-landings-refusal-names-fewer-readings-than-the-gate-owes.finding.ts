import type { Finding } from "../finding.page-type.ts"

export const theLandingsRefusalNamesFewerReadingsThanTheGateOwes = {
  id: "01a060a9-8e91-7ab5-9803-fa3d37ae634e",
  pageTypeSlug: "finding",
  slug: "the-landings-refusal-names-fewer-readings-than-the-gate-owes",
  domainSlug: "domain/alan-harness",
  claim:
    "The landing shortens what `akasha write --dry-run` refused to its first 40 lines, so an operator cannot collect every reading the gate owes in one round. Four runs were needed to clear it, each naming a further set. That refusal is the only place those readings are named, and nothing in it says anything was left out.",
  evidence:
    'Measured 2026-09-01 in a reflink copy at /var/home/walton/post-flip-read-work/akasha. The landing reached exit 0 on the fourth run: 133 days, 294 files, 18892 values judged, 30 identities re-minted.\n\ntools/daily-tracking-landing/land.ts:698 does `...why.trim().split("\\n").slice(0, 40).map(...)` over the joined stderr and stdout of `akasha write --dry-run`. The gate spends about eight lines naming each reading it owes, so 40 lines carries five of them and drops the remainder silently.\n\nRun 1 named a taboo term and four pages. Run 2 named four seat-system pages and an initiative. Run 3 named one page type. Run 4 held. Every run repeats steps 2 through 5 — snapshot, convert, verify against the snapshot, and both halves read alike — which is 10 to 54 seconds of work already done. Each also re-fingerprints a source Alan may have written to in between, so a tracker in use can refuse the act for drift on a run that only exists because the previous refusal was shortened.\n\nThe neighbouring truncation at land.ts:613 shortens fidelity faults to 20, and the number of faults is printed two lines above it, so a reader there knows what was withheld. The write refusal prints no such number.\n\nThe call taken: reported rather than repaired, because tools/daily-tracking-landing/ is another lane\'s tonight.',
} as const satisfies Finding
