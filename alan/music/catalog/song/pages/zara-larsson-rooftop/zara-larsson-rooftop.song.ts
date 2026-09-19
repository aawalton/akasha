import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const zaraLarssonRooftop = {
  id: "019ea4a2-2132-7443-8ae8-b8783106f895",
  type: "page-type/song",
  slug: "zara-larsson-rooftop",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "f79b6304-8adf-4627-a193-9d6caa5e62af",
      externalLink: "https://musicbrainz.org/work/f79b6304-8adf-4627-a193-9d6caa5e62af",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Rooftop",
  artist: "artist/zara-larsson",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
