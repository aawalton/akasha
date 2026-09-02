import type { Song } from "../../song.page-type.ts"

export const arianaGrandeBrandNewYou = {
  id: "019ea4e3-626b-7f4d-a792-fcf27eb9532f",
  pageTypeSlug: "song",
  slug: "ariana-grande-brand-new-you",
  title: "Brand New You",
  artistSlug: "ariana-grande",
  externalId: "d86a28a4-984a-4137-b1dd-04a886afaef2",
  externalLink: "https://musicbrainz.org/work/d86a28a4-984a-4137-b1dd-04a886afaef2",
  source: "musicbrainz",
  lastSyncedAt: "2026-06-08",
  songType: "derivative",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
