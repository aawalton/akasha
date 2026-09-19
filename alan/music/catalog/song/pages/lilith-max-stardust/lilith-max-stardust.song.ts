import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const lilithMaxStardust = {
  id: "019ea4f6-572a-7d87-93a7-b0a3f19dc4b8",
  type: "page-type/song",
  slug: "lilith-max-stardust",
  title: "Stardust",
  artist: "artist/lilith-max",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "3ec785e0-e3f0-4f47-8840-d62de8fd1728",
      externalLink: "https://musicbrainz.org/recording/3ec785e0-e3f0-4f47-8840-d62de8fd1728",
      lastSyncedAt: "2026-06-08",
    },
  ],
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
} as const satisfies Song
