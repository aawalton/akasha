import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorSomeKindOfWonderful = {
  id: "01a0b72f-54c0-794a-802a-afce0d1af12c",
  type: "page-type/song",
  slug: "james-taylor-some-kind-of-wonderful",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "c618285a-4741-347a-9531-0de24ecad150",
      externalLink: "https://musicbrainz.org/work/c618285a-4741-347a-9531-0de24ecad150",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Some Kind of Wonderful",
  artist: "artist/james-taylor",
  performed: true,
} as const satisfies Song
