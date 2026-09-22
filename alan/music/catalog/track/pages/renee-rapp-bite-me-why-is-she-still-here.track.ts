import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const reneeRappBiteMeWhyIsSheStillHere = {
  id: "01a0caa8-fde2-7bb3-ac98-9632f1ceb94f",
  type: "page-type/track",
  slug: "renee-rapp-bite-me-why-is-she-still-here",
  ownLength: 2.50425,
  ownProgress: 2.50425,
  partOfCollections: ["release/renee-rapp-bite-me"],
  status: "completed",
  unit: "unit/minutes",
  title: "Why Is She Still Here?",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ externalId: "2hUYKu1x0UZQXvzCmggvSn", artistName: "Reneé Rapp" }],
  trackKey: "whyisshestillhere|2hUYKu1x0UZQXvzCmggvSn|150255",
  song: "song/renee-rapp-why-is-she-still-here",
  carriedBy: [
    {
      release: "release/renee-rapp-bite-me",
      discNumber: 1,
      position: 3,
      externalId: "10RQeKnNwAUuGULmDd2Vp7",
      externalLink: "https://open.spotify.com/track/10RQeKnNwAUuGULmDd2Vp7",
    },
  ],
} as const satisfies Track
