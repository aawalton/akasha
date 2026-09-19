import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const zaraLarssonVenus = {
  id: "019ea4a1-d6cf-7f1f-81ee-52abfa9035b3",
  type: "page-type/song",
  slug: "zara-larsson-venus",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "d89f899d-2027-4c41-a77c-70d8183343c4",
      externalLink: "https://musicbrainz.org/work/d89f899d-2027-4c41-a77c-70d8183343c4",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Venus",
  artist: "artist/zara-larsson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
