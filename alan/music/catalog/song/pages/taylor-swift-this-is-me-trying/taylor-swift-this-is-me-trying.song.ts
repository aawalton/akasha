import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftThisIsMeTrying = {
  id: "019ea416-49d9-7625-a543-9c6f1d9359d7",
  type: "page-type/song",
  slug: "taylor-swift-this-is-me-trying",
  rank: "A+",
  tags: ["acceptance"],
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "aef21e05-fd48-440c-beb2-6ddd2678cfbc",
      externalLink: "https://musicbrainz.org/work/aef21e05-fd48-440c-beb2-6ddd2678cfbc",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "this is me trying",
  artist: "artist/taylor-swift",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  singability: "A+",
  lyrics: "txt",
  syncedLyrics: "txt",
  insights: "txt",
  personalConnections: "txt",
} as const satisfies Song
