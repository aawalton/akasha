import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const siaGimmeChristmasSnowman = {
  id: "01a15994-8c5b-7030-b384-ae66339768f1",
  type: "page-type/track",
  slug: "sia-gimme-christmas-snowman",
  ownLength: 2.7651,
  ownProgress: 0,
  partOfCollections: ["release/sia-gimme-christmas"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Snowman",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/sia" }],
  trackKey: "snowman|5WUlDfRSoLAfcVSX1WnrxN|165906",
  song: "song/sia-snowman",
  carriedBy: [
    {
      release: "release/sia-gimme-christmas",
      discNumber: 1,
      position: 1,
      externalId: "4oGT0mXfWHTYfTQffDWGlo",
      externalLink: "https://open.spotify.com/track/4oGT0mXfWHTYfTQffDWGlo",
    },
  ],
  createdAt: "2026-10-20T13:51:09.878Z",
  updatedAt: "2026-10-20T13:51:09.878Z",
} as const satisfies Track
