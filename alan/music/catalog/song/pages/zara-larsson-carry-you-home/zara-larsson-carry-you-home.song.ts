import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const zaraLarssonCarryYouHome = {
  id: "019ea49e-da88-7dbf-8955-a0b3ecb5c7d6",
  type: "page-type/song",
  slug: "zara-larsson-carry-you-home",
  title: "Carry You Home",
  artist: "artist/zara-larsson",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "3531e5c3-3dcc-4173-98d8-025908b2c3da",
      externalLink: "https://musicbrainz.org/work/3531e5c3-3dcc-4173-98d8-025908b2c3da",
      lastSyncedAt: "2026-06-08",
    },
  ],
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
