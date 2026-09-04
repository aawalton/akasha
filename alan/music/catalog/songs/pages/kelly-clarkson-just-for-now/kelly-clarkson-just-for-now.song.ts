import type { Song } from "../../song.page-type.ts"

export const kellyClarksonJustForNow = {
  id: "019ea4ac-e79d-7071-92a1-35830f572f3b",
  pageTypeSlug: "song",
  slug: "kelly-clarkson-just-for-now",
  title: "Just for Now",
  artistSlug: "kelly-clarkson",
  externalId: "0bbb49f6-407b-3f1d-8169-75d7f77d869d",
  externalLink: "https://musicbrainz.org/work/0bbb49f6-407b-3f1d-8169-75d7f77d869d",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
