import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorBigYellowTaxi = {
  id: "01a0b72f-2de9-7ccc-aa55-bad7e91592d2",
  type: "page-type/song",
  slug: "james-taylor-big-yellow-taxi",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "be39cb45-a437-43dc-b484-1cd13c4a43c3",
      externalLink: "https://musicbrainz.org/work/be39cb45-a437-43dc-b484-1cd13c4a43c3",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Big Yellow Taxi",
  artist: "artist/james-taylor",
  performed: true,
} as const satisfies Song
