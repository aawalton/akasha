import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterSmokeAndFire = {
  id: "01a0b723-d403-7d94-910d-7e252a6ac235",
  type: "page-type/song",
  slug: "sabrina-carpenter-smoke-and-fire",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "5450fcc1-e68f-4214-bd30-a523ee65d77c",
      externalLink: "https://musicbrainz.org/work/5450fcc1-e68f-4214-bd30-a523ee65d77c",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Smoke and Fire",
  artist: "artist/sabrina-carpenter",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-09-19T00:49:33.699Z",
  updatedAt: "2026-09-19T18:27:18.000Z",
} as const satisfies Song
