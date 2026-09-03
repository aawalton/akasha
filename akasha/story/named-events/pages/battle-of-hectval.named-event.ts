import type { NamedEvent } from "../named-event.page-type.ts"

export const battleOfHectval = {
  id: "019f6865-7cc6-781e-a388-1c4538d4abe9",
  pageTypeSlug: "named-event",
  slug: "battle-of-hectval",
  title: "The big battle at Hectval",
  aliases: ["hextal-major-battle", "hectval-battle"],
  evidenceBeat: 616,
  evidenceChapter: "Interlude – Hectval (Pt. 3)",
  evidenceNote:
    "ruled from sweep evidence 'after one big battle' — hectval-war-start + crusader-51-last-stand left unregistered - separably-dated moments of the same war (rhia-ruled 2026-07-15 drain-end batch)",
  namedEventKind: "battle",
  seq: 33,
  worldSlug: "the-wandering-inn",
} as const satisfies NamedEvent
