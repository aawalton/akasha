import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const mitskiJoblessMonday = {
  id: "019f0e9e-d4b8-74bd-ac4a-e6f6634d8a7a",
  type: "page-type/song",
  slug: "mitski-jobless-monday",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "399ab392-2409-4628-89ef-fa6bb16e4682",
      externalLink: "https://musicbrainz.org/work/399ab392-2409-4628-89ef-fa6bb16e4682",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Jobless Monday",
  artist: "artist/mitski",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-28T14:25:18.008Z",
  updatedAt: "2026-09-19T18:27:18.000Z",
} as const satisfies Song
