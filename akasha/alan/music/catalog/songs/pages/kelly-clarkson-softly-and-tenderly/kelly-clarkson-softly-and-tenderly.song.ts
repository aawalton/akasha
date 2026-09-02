import type { Song } from "../../song.page-type.ts"

export const kellyClarksonSoftlyAndTenderly = {
  id: "019ea4b2-bcfc-73f7-bc12-ae88ab6e7140",
  pageTypeSlug: "song",
  slug: "kelly-clarkson-softly-and-tenderly",
  title: "Softly and Tenderly",
  artistSlug: "kelly-clarkson",
  externalId: "7975de9f-455b-4727-8f93-2f35230ed56a",
  externalLink: "https://musicbrainz.org/work/7975de9f-455b-4727-8f93-2f35230ed56a",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
