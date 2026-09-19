import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaLullaby = {
  id: "019ea4ca-0190-794c-8d79-7562bd62fb74",
  type: "page-type/song",
  slug: "sia-lullaby",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "dbc696dc-09ff-4382-8e69-fec7a967878d",
      externalLink: "https://musicbrainz.org/work/dbc696dc-09ff-4382-8e69-fec7a967878d",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Lullaby",
  artist: "artist/sia",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
