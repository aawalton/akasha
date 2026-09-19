import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const lilithMaxOrion = {
  id: "019ea4f6-2052-7ae7-b3b9-f73b7e79cce4",
  type: "page-type/song",
  slug: "lilith-max-orion",
  title: "Orion",
  artist: "artist/lilith-max",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "d978df48-1c8b-47ad-8e78-b81a4c3ef916",
      externalLink: "https://musicbrainz.org/recording/d978df48-1c8b-47ad-8e78-b81a4c3ef916",
      lastSyncedAt: "2026-06-08",
    },
  ],
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
