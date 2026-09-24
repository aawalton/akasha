import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsNightVisionsDeluxeDemons = {
  id: "01a0c43f-d6db-7af2-a0c8-c5c84cf87ee7",
  type: "page-type/track",
  slug: "imagine-dragons-night-visions-deluxe-demons",
  ownLength: 2.92,
  ownProgress: 2.92,
  partOfCollections: [
    "release/imagine-dragons-night-visions-deluxe",
    "release/imagine-dragons-night-visions",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Demons",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/imagine-dragons" }],
  trackKey: "demons|53XhwfbYqKCa1cC15pYq2q|175200",
  song: "song/imagine-dragons-demons",
  carriedBy: [
    {
      release: "release/imagine-dragons-night-visions",
      discNumber: 1,
      position: 4,
      externalId: "3LlAyCYU26dvFZBDUIMb7a",
      externalLink: "https://open.spotify.com/track/3LlAyCYU26dvFZBDUIMb7a",
    },
    {
      release: "release/imagine-dragons-night-visions-deluxe",
      discNumber: 1,
      position: 4,
      externalId: "1Ntj0hZfncXCQ5hij7igIE",
      externalLink: "https://open.spotify.com/track/1Ntj0hZfncXCQ5hij7igIE",
    },
  ],
} as const satisfies Track
