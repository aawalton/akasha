import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jessicaBaioBadTattoo = {
  id: "019ea4f6-fca4-7a0e-93c2-8beee62094fa",
  type: "page-type/song",
  slug: "jessica-baio-bad-tattoo",
  title: "bad tattoo",
  artist: "artist/jessica-baio",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "6fd5e6cc-2e0a-448f-9826-73b0955b1b78",
      externalLink: "https://musicbrainz.org/recording/6fd5e6cc-2e0a-448f-9826-73b0955b1b78",
      lastSyncedAt: "2026-06-08",
    },
  ],
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
