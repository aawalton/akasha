import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysLetItGo = {
  id: "01a0b71e-9b09-77f7-9e09-58320a113bfd",
  type: "page-type/song",
  slug: "the-piano-guys-let-it-go",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "764e20cb-b418-471b-92ba-f29c4d38b59b",
      externalLink: "https://musicbrainz.org/work/764e20cb-b418-471b-92ba-f29c4d38b59b",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Let It Go",
  artist: "artist/the-piano-guys",
  songType: "derivative",
  performed: true,
} as const satisfies Song
