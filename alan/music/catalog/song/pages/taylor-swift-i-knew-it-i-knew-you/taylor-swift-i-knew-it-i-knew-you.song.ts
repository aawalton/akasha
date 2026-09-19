import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftIKnewItIKnewYou = {
  id: "019ea416-27bb-7a46-8a89-b77c34aa503b",
  type: "page-type/song",
  slug: "taylor-swift-i-knew-it-i-knew-you",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "ad6442df-6b84-48ab-b53a-4b7adf62d147",
      externalLink: "https://musicbrainz.org/work/ad6442df-6b84-48ab-b53a-4b7adf62d147",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "I Knew It, I Knew You",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
} as const satisfies Song
