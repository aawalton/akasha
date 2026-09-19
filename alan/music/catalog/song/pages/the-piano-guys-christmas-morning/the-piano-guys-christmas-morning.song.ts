import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysChristmasMorning = {
  id: "01a0b71e-99af-7f3a-901e-a5bd95183c50",
  type: "page-type/song",
  slug: "the-piano-guys-christmas-morning",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "375a4d72-f9cf-4195-b6d0-f7336f14a1e2",
      externalLink: "https://musicbrainz.org/work/375a4d72-f9cf-4195-b6d0-f7336f14a1e2",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Christmas Morning",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
