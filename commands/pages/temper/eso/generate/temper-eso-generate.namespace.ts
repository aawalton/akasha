import type { Namespace } from "akasha/commands/namespaces/namespace.page-type.types.ts"

export const temperEsoGenerate = {
  id: "01a07c17-20a8-7ecd-bb3f-f70a9f102a4d",
  type: "namespace",
  slug: "temper-eso-generate",
  definition: "what is written out from the game's own files",
  parts: [
    "command/temper-eso-generate-base-game-global",
    "command/temper-eso-generate-chatter-name",
    "command/temper-eso-generate-colon-method",
    "command/temper-eso-generate-hud-scene-catalog",
    "command/temper-eso-generate-declaration",
  ],
  name: "generate",
} as const satisfies Namespace
