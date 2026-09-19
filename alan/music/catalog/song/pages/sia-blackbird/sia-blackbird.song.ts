import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaBlackbird = {
  id: "019ea4c4-ad59-7956-a880-a549781ad68c",
  type: "page-type/song",
  slug: "sia-blackbird",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "8a9cc43c-2958-36a1-b9e9-0afd8a346285",
      externalLink: "https://musicbrainz.org/work/8a9cc43c-2958-36a1-b9e9-0afd8a346285",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Blackbird",
  artist: "artist/sia",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
