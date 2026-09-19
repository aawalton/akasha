import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const mitskiHappy = {
  id: "019f0ea3-fd5f-7c05-8ddd-62998db769f2",
  type: "page-type/song",
  slug: "mitski-happy",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "929b95e8-f06a-4dda-b7ff-0dd854318e30",
      externalLink: "https://musicbrainz.org/work/929b95e8-f06a-4dda-b7ff-0dd854318e30",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Happy",
  artist: "artist/mitski",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
