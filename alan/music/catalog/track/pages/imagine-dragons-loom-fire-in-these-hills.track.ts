import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsLoomFireInTheseHills = {
  id: "01a0c43f-b58f-74b5-9002-b4faf4aabd81",
  type: "page-type/track",
  slug: "imagine-dragons-loom-fire-in-these-hills",
  ownLength: 3.6546666666666665,
  ownProgress: 3.6546666666666665,
  partOfCollections: ["release/imagine-dragons-loom"],
  status: "completed",
  unit: "unit/minutes",
  title: "Fire in These Hills",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/imagine-dragons" }],
  trackKey: "fireinthesehills|53XhwfbYqKCa1cC15pYq2q|219280",
  song: "song/imagine-dragons-fire-in-these-hills",
  carriedBy: [
    {
      release: "release/imagine-dragons-loom",
      discNumber: 1,
      position: 9,
      externalId: "2Morv8EWzWFsfbqG8vdUfy",
      externalLink: "https://open.spotify.com/track/2Morv8EWzWFsfbqG8vdUfy",
    },
  ],
} as const satisfies Track
