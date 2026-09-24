import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const rockapellaComfortJoyIllBeHomeForChristmas = {
  id: "01a0d52b-52dc-7481-935a-4dafb4ec9529",
  type: "page-type/track",
  slug: "rockapella-comfort-joy-ill-be-home-for-christmas",
  ownLength: 3.7260166666666668,
  ownProgress: 3.7260166666666668,
  partOfCollections: ["release/rockapella-comfort-joy"],
  status: "completed",
  unit: "unit/minutes",
  title: "I'll Be Home for Christmas",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/rockapella" }],
  trackKey: "illbehomeforchristmas|1AFSUleuDTapVhm5zUf4ix|223561",
  song: "song/rockapella-ill-be-home-for-christmas",
  carriedBy: [
    {
      release: "release/rockapella-comfort-joy",
      discNumber: 1,
      position: 5,
      externalId: "3h0kbrNTVC6pJoSzuozkaZ",
      externalLink: "https://open.spotify.com/track/3h0kbrNTVC6pJoSzuozkaZ",
    },
  ],
} as const satisfies Track
