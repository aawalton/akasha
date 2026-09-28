import type { Namespace } from "akasha/command/namespace/namespace.page-type.types.ts"

export const storyTurn = {
  id: "01a0deca-7611-7d63-9d4d-c66df6812012",
  type: "page-type/namespace",
  slug: "story-turn",
  definition: "the turns of a played story and how each is made",
  parts: [
    "command/story-turn-advance",
    "command/story-turn-cancel",
    "command/story-turn-rewind",
    "command/story-turn-take-back",
    "module/turn-keeping",
    "module/turn-lore-in-play",
    "module/turn-prompting",
    "module/turn-reaching",
    "module/turn-ready-pushing",
    "module/turn-written",
    "command/story-turn-record",
    "namespace/story-turn-kept",
  ],
  name: "turn",
} as const satisfies Namespace
