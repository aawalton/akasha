import type { Song } from "../../song.page-type.ts"

export const auroraArtemis = {
  id: "019ea4a4-613c-74ce-9248-ddab95be0f69",
  pageTypeSlug: "song",
  slug: "aurora-artemis",
  title: "Artemis",
  artistSlug: "aurora",
  externalId: "430b1cd9-51c3-44f9-a061-f01b5f248007",
  externalLink: "https://musicbrainz.org/work/430b1cd9-51c3-44f9-a061-f01b5f248007",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
