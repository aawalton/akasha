import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jessicaBaioSacred = {
  id: "019ea4f8-c21c-7a9f-836b-aeb0aa084f19",
  type: "page-type/song",
  slug: "jessica-baio-sacred",
  title: "sacred",
  artist: "artist/jessica-baio",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "36c77aa4-ad26-440b-956e-79502e28fa31",
      externalLink: "https://musicbrainz.org/recording/36c77aa4-ad26-440b-956e-79502e28fa31",
      lastSyncedAt: "2026-06-08",
    },
  ],
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
