import type { Song } from "../../song.page-type.ts"

export const billieEilishComeOutAndPlay = {
  id: "019ea4a8-bf88-70a9-bb89-d86f5f077971",
  pageTypeSlug: "song",
  slug: "billie-eilish-come-out-and-play",
  title: "come out and play",
  artistSlug: "billie-eilish",
  externalId: "2ad3135e-8e2f-4f80-b98f-46574797695c",
  externalLink: "https://musicbrainz.org/work/2ad3135e-8e2f-4f80-b98f-46574797695c",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
