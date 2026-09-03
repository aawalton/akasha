import type { Finding } from "../finding.page-type.ts"

export const leverageMapCoreLostRestartRuled = {
  id: "01a06555-9f3e-779b-8465-3e2e773fb45b",
  pageTypeSlug: "finding",
  slug: "leverage-map-core-lost-restart-ruled",
  domainSlug: "domain/all-about-alan",
  claim:
    "The live 37-line Leverage Map core did not survive the 2026-07-27 harness rebuild, Alan ruled restart-from-scratch on 2026-07-28, and loose ends from that day's session are captured only as a routing pointer awaiting Book-of-Alan intake, which Alan explicitly deferred.",
  evidence:
    "From project #17022 (status `someday_maybe`, `live-on: commit`, domain `all-about-alan`), captured and never defined.\n\nThe live 37-line map core did not survive the 2026-07-27 harness rebuild. Alan ruled restart-from-scratch (2026-07-28).\n\nScope this row held:\n1. Rebuild the ranked Leverage Map core from scratch, by interview.\n2. Hold the loose ends surfaced in the 2026-07-28 session as a ROUTING entry — evidence captured here, to be passed to Abby for Book-of-Alan intake when Alan is ready for full capture. He explicitly deferred full capture that day.\n\nNot in scope: writing the Book of Alan itself — that is knowledge/Abby's material; this row only held the pointer until intake.",
} as const satisfies Finding
