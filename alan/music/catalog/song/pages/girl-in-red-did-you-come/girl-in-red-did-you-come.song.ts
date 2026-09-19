import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const girlInRedDidYouCome = {
  id: "01a0b724-d579-7a47-911e-6a874dea196c",
  type: "page-type/song",
  slug: "girl-in-red-did-you-come",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "c7a2cae0-0e77-49c3-a34f-08d101b036f0",
      externalLink: "https://musicbrainz.org/work/c7a2cae0-0e77-49c3-a34f-08d101b036f0",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Did You Come?",
  artist: "artist/girl-in-red",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
