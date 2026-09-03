import type { NamedEvent } from "../named-event.page-type.ts"

export const faceEaterMothAttack = {
  id: "019f6865-7e27-7329-85ac-bbf4e29869df",
  pageTypeSlug: "named-event",
  slug: "face-eater-moth-attack",
  title: "Face-Eater Moth attack on Liscor",
  evidenceBeat: 5,
  evidenceChapter: "5.12",
  evidenceNote:
    "ruled from sweep evidence 'since the battle on the walls yesterday' (rhia-ruled 2026-07-15 drain-end batch)",
  namedEventKind: "battle",
  seq: 37,
  worldSlug: "the-wandering-inn",
} as const satisfies NamedEvent
