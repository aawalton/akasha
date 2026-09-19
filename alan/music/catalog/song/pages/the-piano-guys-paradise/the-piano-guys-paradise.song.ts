import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysParadise = {
  id: "01a0b71e-996d-7527-91d6-95db2589b4c7",
  type: "page-type/song",
  slug: "the-piano-guys-paradise",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "2eb7563d-7c24-41df-810f-0223a746beef",
      externalLink: "https://musicbrainz.org/work/2eb7563d-7c24-41df-810f-0223a746beef",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Paradise",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
