import type { AllAboutAlanTopic } from "akasha/alan/book/pages/all-about-alan/topic/all-about-alan-topic.page-type.types.ts"

export const theCeilingOfOneTimes = {
  id: "01a0c5a6-b27d-7f3d-b215-d3d74ca27559",
  type: "page-type/all-about-alan-topic",
  slug: "the-ceiling-of-one-times",
  title: "The Ceiling Of One Times",
  definition: "the highest multiplier affordability admits, and what holding to it does to my days",
  parents: ["all-about-alan-topic/what-i-let-myself-take-on"],
  related: [
    "all-about-alan-topic/the-multiplier-table",
    "all-about-alan-topic/why-i-stopped-working",
    "all-about-alan-topic/the-arithmetic-of-the-decline",
  ],
  settled:
    "Affordability means no more than a multiplier of one, which is one capacity hour per clock hour. I can sustain that all day if I have to, and that is my ceiling.\n\nSo most of most days is free. Even my hardest sustainable day only breaks even. It never drains.\n\nAgainst that, I spent roughly eighteen years at about one and a half times what I could pay. What I run now is chronic surplus, most days below cost.\n\nThe same governor changed jobs when I could finally decline my load. While the load was un-declinable it was triage, rationing damage I had no power to stop. Now that the load is refusable it allocates something I actually control.",
} as const satisfies AllAboutAlanTopic
