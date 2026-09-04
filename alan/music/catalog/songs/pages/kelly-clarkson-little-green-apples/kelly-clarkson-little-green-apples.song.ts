import type { Song } from "../../song.page-type.ts"

export const kellyClarksonLittleGreenApples = {
  id: "019ea4b1-072b-7904-9465-c7cfef8e1d15",
  pageTypeSlug: "song",
  slug: "kelly-clarkson-little-green-apples",
  title: "Little Green Apples",
  artistSlug: "kelly-clarkson",
  externalId: "f32fe068-b44c-34ec-b8f6-1beaf06f4765",
  externalLink: "https://musicbrainz.org/work/f32fe068-b44c-34ec-b8f6-1beaf06f4765",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
