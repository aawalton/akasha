import type { Song } from "../../song.page-type.ts"

export const arianaGrandeBeMyBaby = {
  id: "019ea4e1-c1f8-7c4d-b931-73f40ad47b01",
  pageTypeSlug: "song",
  slug: "ariana-grande-be-my-baby",
  title: "Be My Baby",
  artistSlug: "ariana-grande",
  externalId: "72363883-f37f-4c63-a3e9-58fe98956ab6",
  externalLink: "https://musicbrainz.org/work/72363883-f37f-4c63-a3e9-58fe98956ab6",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
