import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const coldplayYourLoveMeansEverythingPart2 = {
  id: "01a0ba60-fffe-7e76-9014-75ab1a992ebd",
  type: "page-type/song",
  slug: "coldplay-your-love-means-everything-part-2",
  externalIdentity: [
    {
      source: "musicbrainz",
      externalId: "c636d2c3-25d1-4695-ba0d-26832d0613d1",
      externalLink: "https://musicbrainz.org/work/c636d2c3-25d1-4695-ba0d-26832d0613d1",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Your Love Means Everything, Part 2",
  artist: "artist/coldplay",
  performed: true,
} as const satisfies Song
