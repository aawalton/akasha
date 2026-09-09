import type { Namespace } from "../../namespaces/namespace.page-type.ts"

export const music = {
  id: "01a07bbf-258e-7f64-8bc2-f340c44e592e",
  pageTypeSlug: "namespace",
  type: "namespace",
  slug: "music",
  definition: "the music playing now and what Alan says about it",
  parts: [
    "command/music-capture",
    "command/music-import-artist",
    "command/music-listening",
    "command/music-next",
    "command/music-now-playing",
    "command/music-play",
    "command/music-queue",
    "command/music-rate",
    "command/music-search",
  ],
} as const satisfies Namespace
