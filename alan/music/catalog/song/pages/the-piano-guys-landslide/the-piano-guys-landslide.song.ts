import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysLandslide = {
  id: "01a0b71e-987d-7e01-9120-e8a6c656036e",
  type: "page-type/song",
  slug: "the-piano-guys-landslide",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "1eae63fe-12ee-3e8e-9272-05466ce78733",
      externalLink: "https://musicbrainz.org/work/1eae63fe-12ee-3e8e-9272-05466ce78733",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Landslide",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
