import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysBerlin = {
  id: "01a0b71e-9b55-7c1a-b82a-c2d096e8e96f",
  type: "page-type/song",
  slug: "the-piano-guys-berlin",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "7b065155-da79-4c14-ba52-628b88dd0017",
      externalLink: "https://musicbrainz.org/work/7b065155-da79-4c14-ba52-628b88dd0017",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Berlin",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
