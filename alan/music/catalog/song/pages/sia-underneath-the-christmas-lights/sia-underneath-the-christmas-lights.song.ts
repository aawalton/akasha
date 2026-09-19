import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const siaUnderneathTheChristmasLights = {
  id: "019ea4cd-b5f0-738b-b53c-c7c417d458f1",
  type: "page-type/song",
  slug: "sia-underneath-the-christmas-lights",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "b2622c6f-3c04-40df-984d-b07531f00783",
      externalLink: "https://musicbrainz.org/work/b2622c6f-3c04-40df-984d-b07531f00783",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Underneath the Christmas Lights",
  artist: "artist/sia",
  performed: true,
  lyricsSource: "lrclib",
  written: "collab",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
