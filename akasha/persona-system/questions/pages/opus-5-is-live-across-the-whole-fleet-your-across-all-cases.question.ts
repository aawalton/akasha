import type { Question } from "../question.page-type.ts"

export const opus5IsLiveAcrossTheWholeFleetYourAcrossAllCases = {
  id: "019f96ad-5ba2-77ae-ad9f-6b65c0883530",
  pageTypeSlug: "question",
  slug: "opus-5-is-live-across-the-whole-fleet-your-across-all-cases",
  ask: 'Opus 5 is live across the whole fleet — your "across all cases" directive and the Claude Code bump are both done. A budget heads-up, not a re-open: at our settled max-effort default, Opus 5 runs thinking-ON, so it is peak capability AND a real burn increase over 4.8 (which ran max + thinking-OFF). Default is I leave it at peak per your directive — but if the burn matters, I can lower effort to offset it (thinking stays on). Leave it at peak, or pull the effort lever?',
  askedBy: "nimue",
  askedIn: "019f6930-62ae-7d52-be5c-d690b1d581d2",
  status: "answered",
  offered: [
    "Leave it at peak — Opus 5 + max effort + thinking-on (your directive as-stated, peak capability)",
    "Pull the effort lever — lower effort to offset the burn (thinking stays on); I will propose where",
  ],
  answer:
    "Leave at peak. We only changed Fable and Opus 4.8 cases right? Sonnet and Haiku are still appropriate for simpler tasks",
  closedAt: "2026-07-25T00:54:30.930Z",
  context: "txt",
} as const satisfies Question
