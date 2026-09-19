import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonKiss = {
  id: "019ea4ae-698e-713f-9dd2-e9a73b6af056",
  type: "page-type/song",
  slug: "kelly-clarkson-kiss",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "5611a41a-6822-30b3-ba06-8c756de9aaa3",
      externalLink: "https://musicbrainz.org/work/5611a41a-6822-30b3-ba06-8c756de9aaa3",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Kiss",
  artist: "artist/kelly-clarkson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
