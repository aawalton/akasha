import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const reneeRappBiteMeAtLeastImHot = {
  id: "01a0caa8-ff84-748d-9c66-19df7d3014ab",
  type: "page-type/track",
  slug: "renee-rapp-bite-me-at-least-im-hot",
  ownLength: 2.569183333333333,
  ownProgress: 2.569183333333333,
  partOfCollections: ["release/renee-rapp-bite-me"],
  status: "completed",
  unit: "unit/minutes",
  title: "At Least I’m Hot",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ externalId: "2hUYKu1x0UZQXvzCmggvSn", artistName: "Reneé Rapp" }],
  trackKey: "atleastimhot|2hUYKu1x0UZQXvzCmggvSn|154151",
  song: "song/renee-rapp-at-least-im-hot",
  carriedBy: [
    {
      release: "release/renee-rapp-bite-me",
      discNumber: 1,
      position: 9,
      externalId: "2I0KDNwldn2OdIJPwd0zrJ",
      externalLink: "https://open.spotify.com/track/2I0KDNwldn2OdIJPwd0zrJ",
    },
  ],
} as const satisfies Track
