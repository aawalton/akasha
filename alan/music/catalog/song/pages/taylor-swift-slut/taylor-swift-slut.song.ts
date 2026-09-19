import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftSlut = {
  id: "019ea416-09af-7385-87a3-44014ef04cb7",
  type: "page-type/song",
  slug: "taylor-swift-slut",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "65d4048f-670c-44b9-8c91-0d8945ca37ee",
      externalLink: "https://musicbrainz.org/work/65d4048f-670c-44b9-8c91-0d8945ca37ee",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "“Slut!”",
  artist: "artist/taylor-swift",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
