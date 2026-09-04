import type { Song } from "../../song.page-type.ts"

export const billieEilishMyStrangeAddiction = {
  id: "019ea4aa-cb47-7b4a-8c30-2388ef5bfedf",
  pageTypeSlug: "song",
  slug: "billie-eilish-my-strange-addiction",
  title: "my strange addiction",
  artistSlug: "billie-eilish",
  externalId: "9c98d76e-2454-445c-aa8c-3f18cd9fe8c4",
  externalLink: "https://musicbrainz.org/work/9c98d76e-2454-445c-aa8c-3f18cd9fe8c4",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
