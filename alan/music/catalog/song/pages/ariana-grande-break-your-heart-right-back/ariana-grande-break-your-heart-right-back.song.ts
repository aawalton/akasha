import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeBreakYourHeartRightBack = {
  id: "019ea4e1-2c0d-73e8-95c1-c97051f6ba05",
  type: "page-type/song",
  slug: "ariana-grande-break-your-heart-right-back",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "3e872908-4273-4cb3-b3a3-b8e80e0a19c8",
      externalLink: "https://musicbrainz.org/work/3e872908-4273-4cb3-b3a3-b8e80e0a19c8",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Break Your Heart Right Back",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
