import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftStayBeautiful = {
  id: "019ea416-40b6-7bdf-9a9d-9b9284f37f71",
  type: "song",
  slug: "taylor-swift-stay-beautiful",
  title: "Stay Beautiful",
  artist: "artist/taylor-swift",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "eedfda9b-b13f-43e3-bf08-7189f51ca68f",
      externalLink: "https://musicbrainz.org/work/eedfda9b-b13f-43e3-bf08-7189f51ca68f",
      lastSyncedAt: "2026-06-08",
    },
  ],
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
