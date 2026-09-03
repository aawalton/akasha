import type { NamedEvent } from "../named-event.page-type.ts"

export const villageOfDeadRaid = {
  id: "019f6865-7686-73c0-912c-8cbd131df2f2",
  pageTypeSlug: "named-event",
  slug: "village-of-dead-raid",
  title: "Village of the Dead raid (Horns vanish)",
  aliases: ["horns-death", "horns-vanish", "village-dead-raided"],
  evidenceBeat: 799,
  evidenceChapter: "8.20",
  evidenceNote:
    "ruled from sweep evidence 'The day after the Horns vanished, life resumed.' — window excludes ch68 horns-death - that is the V1 Liscor crypt event (skinner-death), a slug collision (rhia-ruled 2026-07-15 drain-end batch)",
  firstChapter: 495,
  namedEventKind: "battle",
  lastChapter: 824,
  seq: 16,
  worldSlug: "the-wandering-inn",
} as const satisfies NamedEvent
