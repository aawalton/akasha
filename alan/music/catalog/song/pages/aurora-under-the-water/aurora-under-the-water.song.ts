import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraUnderTheWater = {
  id: "019ea4a4-0aca-7217-84f8-726c6e0425bf",
  type: "song",
  slug: "aurora-under-the-water",
  title: "Under the Water",
  artist: "artist/aurora",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "301cc408-49e7-4ca4-9b99-abc3ab8e1745",
      externalLink: "https://musicbrainz.org/work/301cc408-49e7-4ca4-9b99-abc3ab8e1745",
      lastSyncedAt: "2026-06-08",
    },
  ],
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
