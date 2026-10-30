import type { HeardSource } from "akasha/alan/music/listening/heard-music/heard-source/heard-source.page-type.types.ts"

export const seedTopTracks = {
  id: "01a0caa0-e3d9-7a37-ab70-7f93a9f351b4",
  type: "page-type/heard-source",
  slug: "seed-top-tracks",
  definition: "a track Spotify names among the tracks a person plays many times",
  createdAt: "2026-09-22T19:38:56.857Z",
  updatedAt: "2026-10-30T16:28:29.752Z",
} as const satisfies HeardSource
