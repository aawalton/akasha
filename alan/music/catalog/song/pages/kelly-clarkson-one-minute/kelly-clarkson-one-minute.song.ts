import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonOneMinute = {
  id: "019ea4b2-f285-78ff-a1e9-f03f50830364",
  type: "page-type/song",
  slug: "kelly-clarkson-one-minute",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "946a061f-1454-4849-88a4-4583731b5be8",
      externalLink: "https://musicbrainz.org/work/946a061f-1454-4849-88a4-4583731b5be8",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "One Minute",
  artist: "artist/kelly-clarkson",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
