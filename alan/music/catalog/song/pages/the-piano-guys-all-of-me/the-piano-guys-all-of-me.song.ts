import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysAllOfMe = {
  id: "01a0b71e-9acb-7864-a03e-73a4ee32cb43",
  type: "page-type/song",
  slug: "the-piano-guys-all-of-me",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "65dedb2e-36c4-4bf0-9a4e-d69b59743ef0",
      externalLink: "https://musicbrainz.org/work/65dedb2e-36c4-4bf0-9a4e-d69b59743ef0",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "All of Me",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
