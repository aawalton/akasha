import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jessicaBaioBadTimes = {
  id: "019ea4f7-05dd-7ebd-a1fe-8b9146081812",
  type: "page-type/song",
  slug: "jessica-baio-bad-times",
  title: "bad times",
  artist: "artist/jessica-baio",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "068dd601-f033-424b-af34-ddc8eddafd16",
      externalLink: "https://musicbrainz.org/recording/068dd601-f033-424b-af34-ddc8eddafd16",
      lastSyncedAt: "2026-06-08",
    },
  ],
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
