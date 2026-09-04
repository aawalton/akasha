import type { Song } from "../../song.page-type.ts"

export const kellyClarksonJustSing = {
  id: "019ea4af-ab71-7358-90e7-e148f77237f7",
  pageTypeSlug: "song",
  slug: "kelly-clarkson-just-sing",
  title: "Just Sing",
  artistSlug: "kelly-clarkson",
  externalId: "aa51122e-8c9a-433d-8e2b-fdd81439f6db",
  externalLink: "https://musicbrainz.org/work/aa51122e-8c9a-433d-8e2b-fdd81439f6db",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
