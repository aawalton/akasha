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
    "module/turn-keeping",
    "module/turn-prompting",
    "module/turn-reaching",
    "module/turn-ready-pushing",
    "module/turn-written",
  ],
  name: "turn",
} as const satisfies Namespace
