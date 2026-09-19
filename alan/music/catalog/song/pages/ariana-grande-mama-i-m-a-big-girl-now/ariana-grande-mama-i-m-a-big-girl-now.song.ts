import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeMamaIMABigGirlNow = {
  id: "019ea4e7-6821-75e5-afe7-41179f3f46ad",
  type: "page-type/song",
  slug: "ariana-grande-mama-i-m-a-big-girl-now",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "c2048970-f983-3778-a3a9-d6e1ac501797",
      externalLink: "https://musicbrainz.org/work/c2048970-f983-3778-a3a9-d6e1ac501797",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Mama, I’m a Big Girl Now",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
