import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallNewLifeLifeAndDeath = {
  id: "01a0b4c8-3f02-71d0-abba-2091cd22cb43",
  type: "page-type/track",
  slug: "paul-cardall-new-life-life-and-death",
  ownLength: 5.572,
  ownProgress: 5.572,
  partOfCollections: ["release/paul-cardall-new-life"],
  status: "completed",
  unit: "unit/minutes",
  title: "Life and Death",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "lifeanddeath|7FQRbf8gbKw8KZQZAJWxH2|334320",
  song: "song/paul-cardall-life-and-death",
  carriedBy: [
    {
      release: "release/paul-cardall-new-life",
      discNumber: 1,
      position: 4,
      externalId: "6ld6TrelktnNxPwIE44Ke2",
      externalLink: "https://open.spotify.com/track/6ld6TrelktnNxPwIE44Ke2",
    },
  ],
} as const satisfies Track
