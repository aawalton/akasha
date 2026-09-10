import type { NamedEvent } from "../named-event.page-type.types.ts"

export const summoning = {
  id: "019f6865-6fa0-75c1-ae5b-5685593873fe",
  pageTypeSlug: "named-event",
  type: "named-event",
  slug: "summoning",
  title: "The summoning of Earthers to Innworld",
  aliases: ["earther-summoning", "earthers-arrival"],
  evidenceBeat: 10,
  evidenceChapter: "1.00 C",
  evidenceNote:
    "asserted 'Those first few days when we were all summoned to this world' — unique global moment (rhia-ruled 2026-07-15)",
  namedEventKind: "global-event",
  seq: 1,
  world: "the-wandering-inn",
} as const satisfies NamedEvent
