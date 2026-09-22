import type { HeardSource } from "akasha/alan/music/listening/heard-music/heard-source/heard-source.page-type.types.ts"

export const seedTopTracks = {
  id: "01a0caa0-e3d9-7a37-ab70-7f93a9f351b4",
  type: "page-type/heard-source",
  slug: "seed-top-tracks",
  definition: "a track taken from the tracks a person plays most",
} as const satisfies HeardSource
