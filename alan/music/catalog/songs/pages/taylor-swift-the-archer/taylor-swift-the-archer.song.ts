import type { Song } from "../../song.page-type.ts"

export const taylorSwiftTheArcher = {
  id: "019ea416-2e1d-753d-ae73-2a8a1faebdec",
  pageTypeSlug: "song",
  slug: "taylor-swift-the-archer",
  title: "The Archer",
  artistSlug: "taylor-swift",
  externalId: "08c58cba-5b1d-4593-9e3b-e3d50c043f24",
  externalLink: "https://musicbrainz.org/work/08c58cba-5b1d-4593-9e3b-e3d50c043f24",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  rank: "S-",
  singability: "A",
  tags: ["relationships", "masking"],
  lyrics: "txt",
  syncedLyrics: "txt",
  insights: "txt",
  personalConnections: "txt",
} as const satisfies Song
