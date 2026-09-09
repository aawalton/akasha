import type { Namespace } from "../../../../namespaces/namespace.page-type.ts"

export const temperEsoGenerate = {
  id: "01a07c17-20a8-7ecd-bb3f-f70a9f102a4d",
  pageTypeSlug: "namespace",
  slug: "temper-eso-generate",
  definition: "what is written out from the game's own files",
  parts: [
    "command/temper-eso-generate-base-game-globals",
    "command/temper-eso-generate-chatter-names",
    "command/temper-eso-generate-colon-methods",
    "command/temper-eso-generate-hud-scene-catalog",
    "command/temper-eso-generate-typings",
  ],
} as const satisfies Namespace
