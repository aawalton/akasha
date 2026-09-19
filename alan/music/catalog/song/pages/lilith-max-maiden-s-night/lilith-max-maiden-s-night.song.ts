import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const lilithMaxMaidenSNight = {
  id: "019ea4f6-18f1-7b3a-935b-261622cc6ab2",
  type: "page-type/song",
  slug: "lilith-max-maiden-s-night",
  title: "Maiden's Night",
  artist: "artist/lilith-max",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "bfed276a-b12f-49fa-8e37-e745ed0d9dcb",
      externalLink: "https://musicbrainz.org/recording/bfed276a-b12f-49fa-8e37-e745ed0d9dcb",
      lastSyncedAt: "2026-06-08",
    },
  ],
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
} as const satisfies Song
