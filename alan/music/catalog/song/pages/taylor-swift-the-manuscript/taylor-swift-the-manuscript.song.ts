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
} as const satisfies Song
