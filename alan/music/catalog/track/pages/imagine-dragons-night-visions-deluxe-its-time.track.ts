import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsNightVisionsDeluxeItsTime = {
  id: "01a0c43f-d6b0-7db7-a7cc-96d5bfe9ef9a",
  type: "page-type/track",
  slug: "imagine-dragons-night-visions-deluxe-its-time",
  ownLength: 3.9664333333333333,
  ownProgress: 3.9664333333333333,
  partOfCollections: [
    "release/imagine-dragons-night-visions-deluxe",
    "release/imagine-dragons-night-visions",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "It's Time",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/imagine-dragons" }],
  trackKey: "itstime|53XhwfbYqKCa1cC15pYq2q|237986",
  song: "song/imagine-dragons-it-s-time",
  carriedBy: [
    {
      release: "release/imagine-dragons-night-visions",
      discNumber: 1,
      position: 3,
      externalId: "6BtmXhTJMM9sBTHeYYASGz",
      externalLink: "https://open.spotify.com/track/6BtmXhTJMM9sBTHeYYASGz",
    },
    {
      release: "release/imagine-dragons-night-visions-deluxe",
      discNumber: 1,
      position: 3,
      externalId: "7pUYFGnZwLa7I3UmDypJGy",
      externalLink: "https://open.spotify.com/track/7pUYFGnZwLa7I3UmDypJGy",
    },
  ],
} as const satisfies Track
