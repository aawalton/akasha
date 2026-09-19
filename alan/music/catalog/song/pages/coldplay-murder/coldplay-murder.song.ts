import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayMurder = {
  id: "01a0ba60-f9d9-796f-9e3a-48ab658cba94",
  type: "page-type/song",
  slug: "coldplay-murder",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "bdfde0d7-879d-4c57-b070-43b1e594c933",
      externalLink: "https://musicbrainz.org/work/bdfde0d7-879d-4c57-b070-43b1e594c933",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Murder",
  artist: "artist/coldplay",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
