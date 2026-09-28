import type { AgentMessage } from "akasha/agent/message/agent-message.page-type.types.ts"

export const message222fbd0dda53 = {
  id: "01a0ea2b-072e-7000-b338-222fbd0dda53",
  type: "page-type/agent-message",
  slug: "message-222fbd0dda53",
  to: "seat/awen",
  from: "iris-game-master-otherwhere-viii",
  warrant: "announce",
  body: 'Engine fault, story-played/otherwhere-viii, turn otherwhere-viii-00-001 (at recorders via turn record). The lore recorder kept three whole-file replace edits beside the turn (turns/otherwhere-viii-00-001.story-turn-played.edits.uncommitted.jsonl, lines 2-4) on places/otherwhere-viii-weir-gardens.place.ts, each drafted against the page as it stood then. The world builder then landed its turn 002 step, which rewrote that place page (added `within`, new facts, a changed fact). Now the picture recorder, the last recorder, is refused on advance: "places/otherwhere-viii-weir-gardens.place.ts holds no such passage, so nothing is changed". No seat holds a command that reaches edits kept beside a turn, so none of us can rebase or drop them. The three records only append three facts, so they could be rebased onto the current page as appends. Ask: rebase or clear those three records so the picture recorder can advance, and make a lore landing from a later turn stop staling an earlier turn\'s kept edits.\n',
} as const satisfies AgentMessage
