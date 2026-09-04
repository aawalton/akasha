import type { Song } from "../../song.page-type.ts"

export const billieEilishSixFeetUnder = {
  id: "019ea4ab-2ed8-7279-bcba-2d66ce01ccad",
  pageTypeSlug: "song",
  slug: "billie-eilish-six-feet-under",
  title: "Six Feet Under",
  artistSlug: "billie-eilish",
  externalId: "c10c966a-65c9-4e8a-ade7-868d4dade77d",
  externalLink: "https://musicbrainz.org/work/c10c966a-65c9-4e8a-ade7-868d4dade77d",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
