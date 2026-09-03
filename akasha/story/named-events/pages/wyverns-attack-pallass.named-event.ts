import type { NamedEvent } from "../named-event.page-type.ts"

export const wyvernsAttackPallass = {
  id: "019f6865-7b9c-7eae-9a6d-19a3fbdebc99",
  pageTypeSlug: "named-event",
  slug: "wyverns-attack-pallass",
  title: "Wyvern attack on Pallass",
  aliases: ["battle-wyverns"],
  evidenceBeat: 59,
  evidenceChapter: "Mini Stories - Crabs and Drinks",
  evidenceNote:
    "ruled from sweep evidence 'About an hour before the Wyverns attack Pallass' (rhia-ruled 2026-07-15 drain-end batch)",
  namedEventKind: "battle",
  seq: 30,
  worldSlug: "the-wandering-inn",
} as const satisfies NamedEvent
