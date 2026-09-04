import type { NamedEvent } from "../named-event.page-type.ts"

export const winterSolsticeY2 = {
  id: "019f6865-7170-7794-9c14-5233b219e99f",
  pageTypeSlug: "named-event",
  slug: "winter-solstice-y2",
  title: "THE Winter Solstice (the pivotal event)",
  aliases: ["winter-solstice", "solstice"],
  evidenceBeat: 1,
  evidenceChapter: "9.69 H (Pt. 1)",
  evidenceNote:
    "ruled from sweep evidence 'In the days leading up to the Solstice.' — the pivotal Solstice; ch655 fixes it to last day of Mouring / first of Elfebelfast (in-world calendar) (rhia-ruled 2026-07-15 drain-end batch)",
  firstChapter: 625,
  namedEventKind: "festival",
  lastChapter: 824,
  seq: 5,
  worldSlug: "the-wandering-inn",
} as const satisfies NamedEvent
