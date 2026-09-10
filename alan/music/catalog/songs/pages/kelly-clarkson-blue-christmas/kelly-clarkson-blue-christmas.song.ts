import type { Song } from "../../song.page-type.types.ts"

export const kellyClarksonBlueChristmas = {
  id: "019ea4ad-ccfc-75b3-b2be-62d43c4bd1c4",
  pageTypeSlug: "song",
  type: "song",
  slug: "kelly-clarkson-blue-christmas",
  title: "Blue Christmas",
  artist: "kelly-clarkson",
  externalId: "414afdb5-bd79-3349-8a93-d940da14c36e",
  externalLink: "https://musicbrainz.org/work/414afdb5-bd79-3349-8a93-d940da14c36e",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
