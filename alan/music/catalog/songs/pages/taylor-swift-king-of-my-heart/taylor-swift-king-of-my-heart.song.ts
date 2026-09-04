import type { Song } from "../../song.page-type.ts"

export const taylorSwiftKingOfMyHeart = {
  id: "019ea416-2a28-7165-99be-eeb6370d702f",
  pageTypeSlug: "song",
  slug: "taylor-swift-king-of-my-heart",
  title: "King of My Heart",
  artistSlug: "taylor-swift",
  externalId: "d3822229-b860-4827-84cb-e65482106b33",
  externalLink: "https://musicbrainz.org/work/d3822229-b860-4827-84cb-e65482106b33",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
