import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaWolves = {
  id: "019ea4cb-3247-7881-ae1b-fdb2b630fed2",
  type: "page-type/song",
  slug: "sia-wolves",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "26022377-f20c-4d6b-b465-74b9f157c084",
      externalLink: "https://musicbrainz.org/work/26022377-f20c-4d6b-b465-74b9f157c084",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Wolves",
  artist: "artist/sia",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
