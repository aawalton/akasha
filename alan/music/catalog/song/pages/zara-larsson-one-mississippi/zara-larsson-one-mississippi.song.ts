import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const zaraLarssonOneMississippi = {
  id: "019ea49f-2116-7361-a646-b6352ebc9dde",
  type: "page-type/song",
  slug: "zara-larsson-one-mississippi",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "474dc897-57a2-4a43-86dc-6830b4f44aae",
      externalLink: "https://musicbrainz.org/work/474dc897-57a2-4a43-86dc-6830b4f44aae",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "One Mississippi",
  artist: "artist/zara-larsson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
