import type { Question } from "../question.page-type.ts"

export const temperMail15545TheNewTakeAllEndpointWorksOnAWhole = {
  id: "019f710c-fbb2-7f2e-9700-453701a78177",
  pageTypeSlug: "question",
  slug: "temper-mail-15545-the-new-take-all-endpoint-works-on-a-whole",
  ask: "Temper mail (#15545): the new Take All endpoint works on a whole native mail category — no subject filter. Hireling mail lives in SYSTEM_MAIL with everything else (event/PvP/crown/daily rewards). Which behavior do you want?",
  askedBy: "ember",
  askedIn: "019f32f0-ea53-7940-9596-1613e218bb1f",
  status: "answered",
  offered: [
    "Take all: auto-claim every System Mail attachment (simplest, broadens behavior)",
    "Hybrid: native Take All only when the bucket is purely hireling mail, per-item otherwise (recommended)",
    "Keep per-item iteration as-is (close #15545 as not_doing)",
  ],
  answer: "Take all: auto-claim every System Mail attachment (simplest, broadens behavior)",
  closedAt: "2026-07-17T17:08:51.150Z",
  context: "txt",
} as const satisfies Question
