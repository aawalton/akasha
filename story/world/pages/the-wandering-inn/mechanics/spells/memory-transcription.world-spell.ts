import type { WorldSpell } from "akasha/story/world/mechanics/spells/world-spell.page-type.types.ts"

export const memoryTranscription = {
  id: "01a06572-95d2-7611-8d7a-d29d1ab87866",
  type: "page-type/world-spell",
  slug: "memory-transcription",
  title: "Memory Transcription",
  world: "world/the-wandering-inn",
  references: "jsonl",
} as const satisfies WorldSpell
