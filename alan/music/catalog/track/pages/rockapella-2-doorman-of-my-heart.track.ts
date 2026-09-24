import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const rockapella2DoormanOfMyHeart = {
  id: "01a0d52b-52da-7909-983d-b1028171dcd4",
  type: "page-type/track",
  slug: "rockapella-2-doorman-of-my-heart",
  ownLength: 3.8885666666666667,
  ownProgress: 0,
  partOfCollections: ["release/rockapella-2"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Doorman of My Heart",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/rockapella" }],
  trackKey: "doormanofmyheart|1AFSUleuDTapVhm5zUf4ix|233314",
  song: "song/rockapella-doorman-of-my-heart",
  carriedBy: [
    {
      release: "release/rockapella-2",
      discNumber: 1,
      position: 6,
      externalId: "1MdOFkZyEQ0N0LDKhzqIG7",
      externalLink: "https://open.spotify.com/track/1MdOFkZyEQ0N0LDKhzqIG7",
    },
  ],
} as const satisfies Track
