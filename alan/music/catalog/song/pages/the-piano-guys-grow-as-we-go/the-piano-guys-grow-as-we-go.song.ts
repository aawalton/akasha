import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysGrowAsWeGo = {
  id: "01a0b71e-9b88-734e-a8f7-128a98bb4aea",
  type: "page-type/song",
  slug: "the-piano-guys-grow-as-we-go",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "7e704750-08f0-4abf-ace6-f916e1f61484",
      externalLink: "https://musicbrainz.org/work/7e704750-08f0-4abf-ace6-f916e1f61484",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Grow as We Go",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
