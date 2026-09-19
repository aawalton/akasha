import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const zaraLarssonWinterSong = {
  id: "019ea49e-fa5b-7d53-b1fb-cca945aad93d",
  type: "page-type/song",
  slug: "zara-larsson-winter-song",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "43209ae9-4ecf-4d7e-b0c3-d7ca77d3f120",
      externalLink: "https://musicbrainz.org/work/43209ae9-4ecf-4d7e-b0c3-d7ca77d3f120",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Winter Song",
  artist: "artist/zara-larsson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
} as const satisfies Song
