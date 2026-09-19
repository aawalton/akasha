import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const lilithMaxCirce = {
  id: "019ea4f5-e7aa-7b2f-a061-4e4ce2f1a202",
  type: "page-type/song",
  slug: "lilith-max-circe",
  title: "Circe",
  artist: "artist/lilith-max",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "775e900f-5040-409b-8bca-18d4290e590c",
      externalLink: "https://musicbrainz.org/recording/775e900f-5040-409b-8bca-18d4290e590c",
      lastSyncedAt: "2026-06-08",
    },
  ],
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
} as const satisfies Song
