import type { Song } from "../../song.page-type.ts"

export const taylorSwiftEnchanted = {
  id: "019ea416-0911-7478-bd4f-85dfb1fe486d",
  pageTypeSlug: "song",
  slug: "taylor-swift-enchanted",
  title: "Enchanted",
  artistSlug: "taylor-swift",
  externalId: "5569eb48-0821-3d57-ab3b-80f63d3d37e4",
  externalLink: "https://musicbrainz.org/work/5569eb48-0821-3d57-ab3b-80f63d3d37e4",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
