import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsFollowYouCutthroatFollowYou = {
  id: "01a0c43f-db95-7c98-8518-68d879ea5db4",
  type: "page-type/track",
  slug: "imagine-dragons-follow-you-cutthroat-follow-you",
  ownLength: 2.9273833333333332,
  ownProgress: 2.9273833333333332,
  partOfCollections: [
    "release/imagine-dragons-follow-you-cutthroat",
    "release/imagine-dragons-follow-you-summer-21-version",
    "release/imagine-dragons-mercury-acts-1-2",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Follow You",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/imagine-dragons" }],
  trackKey: "followyou|53XhwfbYqKCa1cC15pYq2q|175643",
  song: "song/imagine-dragons-follow-you",
  carriedBy: [
    {
      release: "release/imagine-dragons-follow-you-cutthroat",
      discNumber: 1,
      position: 1,
      externalId: "7FdUvDkaE24o3FPIWTvzv2",
      externalLink: "https://open.spotify.com/track/7FdUvDkaE24o3FPIWTvzv2",
    },
    {
      release: "release/imagine-dragons-follow-you-summer-21-version",
      discNumber: 1,
      position: 2,
      externalId: "2rnZVDY6fPaTUjskifkok3",
      externalLink: "https://open.spotify.com/track/2rnZVDY6fPaTUjskifkok3",
    },
    {
      release: "release/imagine-dragons-mercury-acts-1-2",
      discNumber: 1,
      position: 11,
      externalId: "0LtkAAEpEp1lkLX1ZvjHZb",
      externalLink: "https://open.spotify.com/track/0LtkAAEpEp1lkLX1ZvjHZb",
    },
  ],
} as const satisfies Track
