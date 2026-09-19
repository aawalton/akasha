import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonRespect = {
  id: "019ea4b2-6247-71f7-8f8a-7c4161703fee",
  type: "page-type/song",
  slug: "kelly-clarkson-respect",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "62cd9af9-435f-3632-b885-f7d4685211a4",
      externalLink: "https://musicbrainz.org/work/62cd9af9-435f-3632-b885-f7d4685211a4",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Respect",
  artist: "artist/kelly-clarkson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
