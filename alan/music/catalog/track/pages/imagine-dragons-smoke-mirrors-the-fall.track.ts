import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsSmokeMirrorsTheFall = {
  id: "01a0c43f-d42e-77b3-9325-09e235741ff4",
  type: "page-type/track",
  slug: "imagine-dragons-smoke-mirrors-the-fall",
  ownLength: 6.041333333333333,
  ownProgress: 6.041333333333333,
  partOfCollections: ["release/imagine-dragons-smoke-mirrors"],
  status: "completed",
  unit: "unit/minutes",
  title: "The Fall",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/imagine-dragons" }],
  trackKey: "thefall|53XhwfbYqKCa1cC15pYq2q|362480",
  song: "song/imagine-dragons-the-fall",
  carriedBy: [
    {
      release: "release/imagine-dragons-smoke-mirrors",
      discNumber: 1,
      position: 13,
      externalId: "5QfjjXpqTmWjzm9auqzQSJ",
      externalLink: "https://open.spotify.com/track/5QfjjXpqTmWjzm9auqzQSJ",
    },
  ],
} as const satisfies Track
