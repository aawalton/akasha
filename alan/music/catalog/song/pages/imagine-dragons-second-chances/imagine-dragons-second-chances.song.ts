import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsSecondChances = {
  id: "019ea49c-03a2-72fb-b93a-ecb25d57b7f2",
  type: "page-type/song",
  slug: "imagine-dragons-second-chances",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "4a88d265-2e1d-4002-897b-e02c2fc59987",
      externalLink: "https://musicbrainz.org/work/4a88d265-2e1d-4002-897b-e02c2fc59987",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Second Chances",
  artist: "artist/imagine-dragons",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
