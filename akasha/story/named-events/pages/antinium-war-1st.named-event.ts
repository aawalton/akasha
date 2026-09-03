import type { NamedEvent } from "../named-event.page-type.ts"

export const antiniumWar1st = {
  id: "019f6865-7620-77a0-83ab-1862089cdc5a",
  pageTypeSlug: "named-event",
  slug: "antinium-war-1st",
  title: "First Antinium War",
  aliases: [
    "first-antinium-war-start",
    "antinium-war-start",
    "antinium-wars-1",
    "first-antinium-wars",
  ],
  evidenceBeat: 74,
  evidenceChapter: "Interlude – The Antinium Wars (Pt.1)",
  evidenceNote:
    "ruled from sweep evidence 'One month after the start of the First Antinium War' — war-start offsets and during-war refs share the node; anchors carry their own coarse tiers (rhia-ruled 2026-07-15 drain-end batch)",
  namedEventKind: "battle",
  seq: 15,
  worldSlug: "the-wandering-inn",
} as const satisfies NamedEvent
