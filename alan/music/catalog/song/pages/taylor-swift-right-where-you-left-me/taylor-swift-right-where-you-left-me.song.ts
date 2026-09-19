import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftRightWhereYouLeftMe = {
  id: "019ea416-3be2-7a70-a8d6-8200e2b45a29",
  type: "page-type/song",
  slug: "taylor-swift-right-where-you-left-me",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "bcc365a8-fdfe-471e-a619-7d4c03511f7d",
      externalLink: "https://musicbrainz.org/work/bcc365a8-fdfe-471e-a619-7d4c03511f7d",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "right where you left me",
  artist: "artist/taylor-swift",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
