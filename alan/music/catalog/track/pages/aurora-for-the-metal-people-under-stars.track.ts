import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const auroraForTheMetalPeopleUnderStars = {
  id: "01a0b638-06b8-74a8-989e-961c311e6c6f",
  type: "page-type/track",
  slug: "aurora-for-the-metal-people-under-stars",
  ownLength: 3.3171,
  ownProgress: 3.3171,
  partOfCollections: ["release/aurora-for-the-metal-people", "release/aurora-under-stars"],
  status: "completed",
  unit: "unit/minutes",
  title: "Under Stars",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/aurora" }],
  trackKey: "understars|1WgXqy2Dd70QQOU7Ay074N|199026",
  song: "song/aurora-under-stars",
  carriedBy: [
    {
      release: "release/aurora-for-the-metal-people",
      discNumber: 1,
      position: 3,
      externalId: "6TcFwDCZvm9Lrcws3aTQ9N",
      externalLink: "https://open.spotify.com/track/6TcFwDCZvm9Lrcws3aTQ9N",
    },
    {
      release: "release/aurora-under-stars",
      discNumber: 1,
      position: 1,
      externalId: "2LFgK4Uk09LgP6Ta0ne8YF",
      externalLink: "https://open.spotify.com/track/2LFgK4Uk09LgP6Ta0ne8YF",
    },
  ],
} as const satisfies Track
