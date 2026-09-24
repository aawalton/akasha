import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsNightVisionsDeluxeHearMe = {
  id: "01a0c43f-d758-7362-84c9-5c989333a6a8",
  type: "page-type/track",
  slug: "imagine-dragons-night-visions-deluxe-hear-me",
  ownLength: 3.8706666666666667,
  ownProgress: 3.8706666666666667,
  partOfCollections: [
    "release/imagine-dragons-night-visions-deluxe",
    "release/imagine-dragons-night-visions",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Hear Me",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/imagine-dragons" }],
  trackKey: "hearme|53XhwfbYqKCa1cC15pYq2q|232240",
  song: "song/imagine-dragons-hear-me",
  carriedBy: [
    {
      release: "release/imagine-dragons-night-visions",
      discNumber: 1,
      position: 7,
      externalId: "3Agiwcd2KjBOG2MkckhC3i",
      externalLink: "https://open.spotify.com/track/3Agiwcd2KjBOG2MkckhC3i",
    },
    {
      release: "release/imagine-dragons-night-visions-deluxe",
      discNumber: 1,
      position: 7,
      externalId: "4R4sJ1jv8nxwjSl6F06yKG",
      externalLink: "https://open.spotify.com/track/4R4sJ1jv8nxwjSl6F06yKG",
    },
  ],
} as const satisfies Track
