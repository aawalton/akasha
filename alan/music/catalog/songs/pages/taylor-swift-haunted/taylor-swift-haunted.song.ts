import type { Song } from "../../song.page-type.ts"

export const taylorSwiftHaunted = {
  id: "019ea416-1fb3-7271-a0d8-87e6cb12ac01",
  pageTypeSlug: "song",
  slug: "taylor-swift-haunted",
  title: "Haunted",
  artistSlug: "taylor-swift",
  externalId: "642e67bb-1e6f-3275-93fb-02d99f55ac85",
  externalLink: "https://musicbrainz.org/work/642e67bb-1e6f-3275-93fb-02d99f55ac85",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
