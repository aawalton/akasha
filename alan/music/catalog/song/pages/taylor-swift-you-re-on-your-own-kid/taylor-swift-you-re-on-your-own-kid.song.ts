import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftYouReOnYourOwnKid = {
  id: "019ea416-45c0-7a33-b208-4ea76c9a24dc",
  type: "page-type/song",
  slug: "taylor-swift-you-re-on-your-own-kid",
  rank: "A",
  tags: ["independence"],
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "5888eb73-f509-47a9-a788-62c769f43c99",
      externalLink: "https://musicbrainz.org/work/5888eb73-f509-47a9-a788-62c769f43c99",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "You’re on Your Own, Kid",
  artist: "artist/taylor-swift",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  singability: "A",
  lyrics: "txt",
  syncedLyrics: "txt",
  insights: "txt",
  personalConnections: "txt",
} as const satisfies Song
