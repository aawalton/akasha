import type { Song } from "../../song.page-type.types.ts"

export const arianaGrandeAdore = {
  id: "019ea4e1-8ec4-7d87-945e-914ad58f57de",
  pageTypeSlug: "song",
  type: "song",
  slug: "ariana-grande-adore",
  title: "Adore",
  artist: "ariana-grande",
  externalId: "664f655a-0eb9-45ea-a7bc-65f704c97a8f",
  externalLink: "https://musicbrainz.org/work/664f655a-0eb9-45ea-a7bc-65f704c97a8f",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
