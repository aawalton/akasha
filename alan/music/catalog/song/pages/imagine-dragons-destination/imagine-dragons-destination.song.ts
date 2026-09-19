import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const imagineDragonsDestination = {
  id: "019ea49a-2e0b-7619-aec0-4c37fc491789",
  type: "page-type/song",
  slug: "imagine-dragons-destination",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "b604a4cb-f5d1-4449-8c3e-e3ef5d35ced1",
      externalLink: "https://musicbrainz.org/work/b604a4cb-f5d1-4449-8c3e-e3ef5d35ced1",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Destination",
  artist: "artist/imagine-dragons",
  performed: true,
  lyricsSource: "lrclib",
  lyrics: "txt",
  syncedLyrics: "txt",
} as const satisfies Song
