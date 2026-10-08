import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftMarjorie = {
  id: "019ea416-21cd-75f0-834a-ba55e8cd87e6",
  type: "page-type/song",
  slug: "taylor-swift-marjorie",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "789801dc-550e-431f-9599-d9b83285ff71",
      externalLink: "https://musicbrainz.org/work/789801dc-550e-431f-9599-d9b83285ff71",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "marjorie",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-07T21:56:14.413Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
