import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysTwinkleLullaby = {
  id: "01a0b71e-97f4-7c68-acb6-373a24d405a6",
  type: "page-type/song",
  slug: "the-piano-guys-twinkle-lullaby",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "04e32841-1e18-49a2-bc7b-4e5cf08dd0ee",
      externalLink: "https://musicbrainz.org/work/04e32841-1e18-49a2-bc7b-4e5cf08dd0ee",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Twinkle Lullaby",
  artist: "artist/the-piano-guys",
  songType: "derivative",
  performed: true,
} as const satisfies Song
