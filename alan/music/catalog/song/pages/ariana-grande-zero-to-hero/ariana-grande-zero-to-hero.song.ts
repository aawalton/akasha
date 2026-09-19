import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeZeroToHero = {
  id: "019ea4e8-c8d6-70b4-8a3e-6a13b7ac52d2",
  type: "page-type/song",
  slug: "ariana-grande-zero-to-hero",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "b5dbac6b-b842-3ab6-8882-a24426270e99",
      externalLink: "https://musicbrainz.org/work/b5dbac6b-b842-3ab6-8882-a24426270e99",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Zero to Hero",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
