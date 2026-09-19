import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const sabrinaCarpenterDreamGirl = {
  id: "01a0b723-ce47-7df6-97a0-b432b431b918",
  type: "page-type/song",
  slug: "sabrina-carpenter-dream-girl",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "df1cc936-36d8-49dd-a3cc-ff3637ec614b",
      externalLink: "https://musicbrainz.org/work/df1cc936-36d8-49dd-a3cc-ff3637ec614b",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Dream Girl",
  artist: "artist/sabrina-carpenter",
  performed: true,
} as const satisfies Song
