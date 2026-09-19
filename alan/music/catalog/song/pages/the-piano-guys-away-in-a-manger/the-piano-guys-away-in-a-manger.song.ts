import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysAwayInAManger = {
  id: "01a0b71e-9bf6-7a21-b36f-4cf5ba7363c1",
  type: "page-type/song",
  slug: "the-piano-guys-away-in-a-manger",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "88da69bc-6e65-39bd-ac62-6a0df2c86d29",
      externalLink: "https://musicbrainz.org/work/88da69bc-6e65-39bd-ac62-6a0df2c86d29",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Away in a Manger",
  artist: "artist/the-piano-guys",
  songType: "derivative",
  performed: true,
} as const satisfies Song
