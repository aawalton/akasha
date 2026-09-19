import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const zaraLarssonWowRemix = {
  id: "01a0ba90-8f0f-7d1b-b82c-d632f11d8abe",
  type: "page-type/song",
  slug: "zara-larsson-wow-remix",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "bd1ab8d8-d92d-4b3a-b6bc-1368eed04d71",
      externalLink: "https://musicbrainz.org/work/bd1ab8d8-d92d-4b3a-b6bc-1368eed04d71",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "WOW (remix)",
  artist: "artist/zara-larsson",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
