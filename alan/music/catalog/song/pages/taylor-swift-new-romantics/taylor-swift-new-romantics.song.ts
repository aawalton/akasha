import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftNewRomantics = {
  id: "019ea416-38b5-79dc-b632-1040644c7699",
  type: "page-type/song",
  slug: "taylor-swift-new-romantics",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "8828a9c2-ffde-429f-b3e7-de6a73fbfd36",
      externalLink: "https://musicbrainz.org/work/8828a9c2-ffde-429f-b3e7-de6a73fbfd36",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "New Romantics",
  artist: "artist/taylor-swift",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
