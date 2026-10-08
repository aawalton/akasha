import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftTheManuscript = {
  id: "019ea416-30b7-752a-b6dd-b2bccf30cd17",
  type: "page-type/song",
  slug: "taylor-swift-the-manuscript",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "38a8256a-a297-494e-9f53-45f21715aa4b",
      externalLink: "https://musicbrainz.org/work/38a8256a-a297-494e-9f53-45f21715aa4b",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "The Manuscript",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
  createdAt: "2026-06-07T21:56:18.231Z",
  updatedAt: "2026-09-19T18:27:41.000Z",
} as const satisfies Song
