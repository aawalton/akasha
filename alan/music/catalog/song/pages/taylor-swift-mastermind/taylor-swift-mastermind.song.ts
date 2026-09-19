import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftMastermind = {
  id: "019ea416-2526-7682-b105-33902152c3f5",
  type: "page-type/song",
  slug: "taylor-swift-mastermind",
  rank: "A+",
  tags: ["wanted"],
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "9a345806-abf4-468f-b792-529848c28251",
      externalLink: "https://musicbrainz.org/work/9a345806-abf4-468f-b792-529848c28251",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Mastermind",
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
