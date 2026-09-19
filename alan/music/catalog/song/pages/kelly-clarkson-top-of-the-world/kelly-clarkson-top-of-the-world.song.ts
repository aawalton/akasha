import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonTopOfTheWorld = {
  id: "019ea4b2-200e-752b-81c7-3975bcd2915c",
  type: "page-type/song",
  slug: "kelly-clarkson-top-of-the-world",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "490d1425-f8eb-48e4-9e0d-63fad100c6a7",
      externalLink: "https://musicbrainz.org/work/490d1425-f8eb-48e4-9e0d-63fad100c6a7",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Top of the World",
  artist: "artist/kelly-clarkson",
  performed: true,
} as const satisfies Song
