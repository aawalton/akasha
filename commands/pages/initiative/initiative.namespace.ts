import type { Namespace } from "akasha/commands/namespaces/namespace.page-type.types.ts"

export const initiative = {
  id: "01a082e8-a8ea-7b0b-a8b3-f6c4e7ac5d19",
  type: "namespace",
  slug: "initiative",
  definition: "the initiatives at work and the intents each one has",
  parts: [
    "command/initiative-move-intent",
    "command/initiative-work-tree",
    "command/initiative-delete-intent",
    "command/initiative-delete",
    "command/initiative-hand-intent",
  ],
  name: "initiative",
} as const satisfies Namespace
