import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jessicaBaioSharpEdges = {
  id: "019ea4f8-d9ab-779b-a007-c7821f4ec2a8",
  type: "page-type/song",
  slug: "jessica-baio-sharp-edges",
  title: "sharp edges",
  artist: "artist/jessica-baio",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "62548ac0-d2c9-418d-a6f9-a8beac5fb197",
      externalLink: "https://musicbrainz.org/recording/62548ac0-d2c9-418d-a6f9-a8beac5fb197",
      lastSyncedAt: "2026-06-08",
    },
  ],
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
