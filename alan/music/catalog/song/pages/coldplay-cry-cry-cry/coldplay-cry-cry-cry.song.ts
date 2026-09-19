import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayCryCryCry = {
  id: "01a0ba5d-3948-7623-ae8b-1ac9a2585ab7",
  type: "page-type/song",
  slug: "coldplay-cry-cry-cry",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "153c5520-2dc6-4944-a809-8819298295c9",
      externalLink: "https://musicbrainz.org/work/153c5520-2dc6-4944-a809-8819298295c9",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Cry Cry Cry",
  artist: "artist/coldplay",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
