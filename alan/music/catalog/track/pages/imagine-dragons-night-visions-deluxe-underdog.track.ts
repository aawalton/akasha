import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsNightVisionsDeluxeUnderdog = {
  id: "01a0c43f-d7d5-7505-90de-5d80e8f9e747",
  type: "page-type/track",
  slug: "imagine-dragons-night-visions-deluxe-underdog",
  ownLength: 3.4451,
  ownProgress: 3.4451,
  partOfCollections: [
    "release/imagine-dragons-night-visions-deluxe",
    "release/imagine-dragons-night-visions",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Underdog",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/imagine-dragons" }],
  trackKey: "underdog|53XhwfbYqKCa1cC15pYq2q|206706",
  song: "song/imagine-dragons-underdog",
  carriedBy: [
    {
      release: "release/imagine-dragons-night-visions",
      discNumber: 1,
      position: 10,
      externalId: "0jjphpegPbJIk0C6BSvTE5",
      externalLink: "https://open.spotify.com/track/0jjphpegPbJIk0C6BSvTE5",
    },
    {
      release: "release/imagine-dragons-night-visions-deluxe",
      discNumber: 1,
      position: 10,
      externalId: "5QkekEa4chV2jzA6007bD6",
      externalLink: "https://open.spotify.com/track/5QkekEa4chV2jzA6007bD6",
    },
  ],
} as const satisfies Track
