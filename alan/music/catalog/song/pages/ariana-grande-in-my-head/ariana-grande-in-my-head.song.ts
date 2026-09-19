import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeInMyHead = {
  id: "019ea4e2-310b-7579-b3dc-225df5ce2af7",
  type: "page-type/song",
  slug: "ariana-grande-in-my-head",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "847fb363-db90-4494-9153-ad3ae72dfca9",
      externalLink: "https://musicbrainz.org/work/847fb363-db90-4494-9153-ad3ae72dfca9",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "in my head",
  artist: "artist/ariana-grande",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
