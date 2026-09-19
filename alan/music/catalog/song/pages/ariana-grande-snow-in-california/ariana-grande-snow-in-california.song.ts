import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeSnowInCalifornia = {
  id: "019ea4e5-0ca2-7ee5-8243-eae22684c932",
  type: "page-type/song",
  slug: "ariana-grande-snow-in-california",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "4bd0921e-537d-405a-b9df-00ffcdd393ab",
      externalLink: "https://musicbrainz.org/work/4bd0921e-537d-405a-b9df-00ffcdd393ab",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Snow in California",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
