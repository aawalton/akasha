import type { Song } from "../../song.page-type.ts"

export const billieEilishTheGreatest = {
  id: "019ea4a9-1e2b-7e60-9231-1137cc6fbce9",
  pageTypeSlug: "song",
  slug: "billie-eilish-the-greatest",
  title: "THE GREATEST",
  artistSlug: "billie-eilish",
  externalId: "435b82d3-2bab-46ab-8386-a026fed5624b",
  externalLink: "https://musicbrainz.org/work/435b82d3-2bab-46ab-8386-a026fed5624b",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
