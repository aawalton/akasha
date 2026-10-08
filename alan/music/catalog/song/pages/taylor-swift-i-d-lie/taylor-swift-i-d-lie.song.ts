import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftIDLie = {
  id: "019ea416-28be-768f-982c-16a26cbc5f94",
  type: "page-type/song",
  slug: "taylor-swift-i-d-lie",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "be23209d-34fe-4532-bb38-8f9cbdf829d6",
      externalLink: "https://musicbrainz.org/work/be23209d-34fe-4532-bb38-8f9cbdf829d6",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "I’d Lie",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-07T21:56:16.190Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
