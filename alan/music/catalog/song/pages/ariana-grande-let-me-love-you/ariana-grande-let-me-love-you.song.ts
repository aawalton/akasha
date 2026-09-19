import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeLetMeLoveYou = {
  id: "019ea4e3-b5ad-74c1-a9cc-602bfa386efe",
  type: "page-type/song",
  slug: "ariana-grande-let-me-love-you",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "e47b223f-d28c-4747-8f9f-73a455281d94",
      externalLink: "https://musicbrainz.org/work/e47b223f-d28c-4747-8f9f-73a455281d94",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Let Me Love You",
  artist: "artist/ariana-grande",
  songType: "original",
  performed: true,
  lyricsSource: "lrclib",
  written: "solo",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
