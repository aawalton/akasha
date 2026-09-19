import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaLetYourTearsFall = {
  id: "019ea4ad-f94c-7d85-802c-0bc8c4a16185",
  type: "page-type/song",
  slug: "sia-let-your-tears-fall",
  partOfCollections: ["artist/kelly-clarkson"],
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "4a2cd499-933c-4595-9bc5-8f8c6d048bb5",
      externalLink: "https://musicbrainz.org/work/4a2cd499-933c-4595-9bc5-8f8c6d048bb5",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Let Your Tears Fall",
  artist: "artist/sia",
  performed: false,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
