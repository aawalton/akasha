import type { Song } from "../../song.page-type.ts"

export const taylorSwiftHalfOfMyHeart = {
  id: "019ea416-2857-7ccc-8fd6-296e9e7307f1",
  pageTypeSlug: "song",
  slug: "taylor-swift-half-of-my-heart",
  title: "Half of My Heart",
  artistSlug: "taylor-swift",
  externalId: "b6a979c1-3f28-340c-93bb-95baf8dfdc27",
  externalLink: "https://musicbrainz.org/work/b6a979c1-3f28-340c-93bb-95baf8dfdc27",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
