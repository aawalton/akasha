import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeTwilightZone = {
  id: "019ea4e8-320d-78cc-a7df-1674cc00d642",
  type: "page-type/song",
  slug: "ariana-grande-twilight-zone",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "eded856f-03ba-4df3-a56a-2b9715617be6",
      externalLink: "https://musicbrainz.org/work/eded856f-03ba-4df3-a56a-2b9715617be6",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "twilight zone",
  artist: "artist/ariana-grande",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
