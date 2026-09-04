import type { Song } from "../../song.page-type.ts"

export const taylorSwiftLondonBoy = {
  id: "019ea416-1be4-7b6a-a754-5a1085508d96",
  pageTypeSlug: "song",
  slug: "taylor-swift-london-boy",
  title: "London Boy",
  artistSlug: "taylor-swift",
  externalId: "2c161280-b221-4cad-9cce-a4fabf498200",
  externalLink: "https://musicbrainz.org/work/2c161280-b221-4cad-9cce-a4fabf498200",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
