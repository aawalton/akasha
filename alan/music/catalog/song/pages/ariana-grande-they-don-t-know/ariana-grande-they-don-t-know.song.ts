import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeTheyDonTKnow = {
  id: "019ea4e4-ad4f-769f-a70e-cc827e4f513f",
  type: "page-type/song",
  slug: "ariana-grande-they-don-t-know",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "405043ef-3581-4d8f-b600-9f9b80be396b",
      externalLink: "https://musicbrainz.org/work/405043ef-3581-4d8f-b600-9f9b80be396b",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "They Don’t Know",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
