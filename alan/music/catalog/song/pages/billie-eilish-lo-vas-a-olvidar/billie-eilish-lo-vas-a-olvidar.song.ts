import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const billieEilishLoVasAOlvidar = {
  id: "019ea4ab-bd46-7103-991e-57900a309692",
  type: "page-type/song",
  slug: "billie-eilish-lo-vas-a-olvidar",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "e1047e91-58a5-4847-a8c9-a8372477d290",
      externalLink: "https://musicbrainz.org/work/e1047e91-58a5-4847-a8c9-a8372477d290",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Lo vas a olvidar",
  artist: "artist/billie-eilish",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
