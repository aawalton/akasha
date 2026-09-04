import type { NamedEvent } from "../named-event.page-type.ts"

export const eclipseSolstice = {
  id: "019f6865-737c-75b2-9a27-1401ae0fafe6",
  pageTypeSlug: "named-event",
  slug: "eclipse-solstice",
  title: "Solar eclipse at the Summer Solstice",
  aliases: ["eclipse", "solar-eclipse"],
  evidenceBeat: 1246,
  evidenceChapter: "Solstice (Pt. 1)",
  evidenceNote:
    "ruled from sweep evidence 'The sun went out' — the sun went out - strongest cross-POV simultaneity; ch748 later eclipse left unresolved (eclipses recur) (rhia-ruled 2026-07-15 drain-end batch)",
  firstChapter: 465,
  namedEventKind: "global-event",
  lastChapter: 500,
  seq: 10,
  worldSlug: "the-wandering-inn",
} as const satisfies NamedEvent
