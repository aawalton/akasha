import type { NamedEvent } from "akasha/story/world/named-events/named-event.page-type.types.ts"

export const battleOfHectval = {
  id: "019f6865-7cc6-781e-a388-1c4538d4abe9",
  type: "page-type/named-event",
  slug: "battle-of-hectval",
  title: "The big battle at Hectval",
  aliases: ["hextal-major-battle", "hectval-battle"],
  evidenceBeat: 616,
  evidenceChapter: "Interlude – Hectval (Pt. 3)",
  evidenceNote:
    "ruled from sweep evidence 'after one big battle' — hectval-war-start + crusader-51-last-stand left unregistered - separably-dated moments of the same war (rhia-ruled 2026-07-15 drain-end batch)",
  firstChapter: 563,
  namedEventKind: "battle",
  world: "world/the-wandering-inn",
  createdAt: "2026-07-16T00:48:29.382Z",
  updatedAt: "2026-09-22T13:44:58.000Z",
} as const satisfies NamedEvent
