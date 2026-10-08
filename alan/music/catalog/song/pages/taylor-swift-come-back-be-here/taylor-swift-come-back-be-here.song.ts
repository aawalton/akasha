import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftComeBackBeHere = {
  id: "019ea416-17ed-764e-9fa3-83c9e508f290",
  type: "page-type/song",
  slug: "taylor-swift-come-back-be-here",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "fe4c649c-751f-4261-a009-9dd6944d986e",
      externalLink: "https://musicbrainz.org/work/fe4c649c-751f-4261-a009-9dd6944d986e",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Come Back… Be Here",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-07T21:56:11.885Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
