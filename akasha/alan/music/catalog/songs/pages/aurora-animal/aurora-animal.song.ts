import type { Song } from "../../song.page-type.ts"

export const auroraAnimal = {
  id: "019ea4a6-e4da-77eb-9170-48a094c1e900",
  pageTypeSlug: "song",
  slug: "aurora-animal",
  title: "Animal",
  artistSlug: "aurora",
  externalId: "c0125a33-540a-44f3-bb22-6ff19fc8f728",
  externalLink: "https://musicbrainz.org/work/c0125a33-540a-44f3-bb22-6ff19fc8f728",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
