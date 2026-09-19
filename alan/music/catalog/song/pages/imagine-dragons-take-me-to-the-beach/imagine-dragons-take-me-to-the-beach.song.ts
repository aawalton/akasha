import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsTakeMeToTheBeach = {
  id: "019ea49c-ac11-712d-9fcd-c87b5fe91a63",
  type: "page-type/song",
  slug: "imagine-dragons-take-me-to-the-beach",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "c2fa30b1-4ab0-434f-b887-e6175761aae6",
      externalLink: "https://musicbrainz.org/work/c2fa30b1-4ab0-434f-b887-e6175761aae6",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Take Me to the Beach",
  artist: "artist/imagine-dragons",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
