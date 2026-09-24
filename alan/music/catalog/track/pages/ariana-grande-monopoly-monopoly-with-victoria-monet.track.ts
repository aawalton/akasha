import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeMonopolyMonopolyWithVictoriaMonet = {
  id: "01a0a6c5-386d-77de-8072-c41f9a09a85f",
  type: "page-type/track",
  slug: "ariana-grande-monopoly-monopoly-with-victoria-monet",
  ownLength: 2.6431,
  ownProgress: 2.6431,
  partOfCollections: ["release/ariana-grande-monopoly"],
  status: "completed",
  unit: "unit/minutes",
  title: "MONOPOLY (with Victoria Monét)",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ artist: "artist/ariana-grande" }, { artistName: "Victoria Monét" }],
  trackKey: "monopolywithvictoriamonet|63XBtGSEZINSyXylZxEUbv,66CXWjxzNUsdJxJ2JdwvnR|158586",
  song: "song/ariana-grande-monopoly",
  carriedBy: [
    {
      release: "release/ariana-grande-monopoly",
      discNumber: 1,
      position: 1,
      externalId: "6tsOcBnaKgzK22yEiqRh8P",
      externalLink: "https://open.spotify.com/track/6tsOcBnaKgzK22yEiqRh8P",
    },
  ],
} as const satisfies Track
