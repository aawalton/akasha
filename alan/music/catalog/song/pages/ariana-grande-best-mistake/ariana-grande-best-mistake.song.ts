import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeBestMistake = {
  id: "019ea4e2-2b1f-7db3-83d1-485ddc0a54a2",
  type: "page-type/song",
  slug: "ariana-grande-best-mistake",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "83a8fb6b-784e-4abc-adc9-aa349c25f096",
      externalLink: "https://musicbrainz.org/work/83a8fb6b-784e-4abc-adc9-aa349c25f096",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Best Mistake",
  artist: "artist/ariana-grande",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
