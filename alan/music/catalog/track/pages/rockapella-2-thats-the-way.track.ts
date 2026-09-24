import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const rockapella2ThatsTheWay = {
  id: "01a0d52b-52da-7e17-ba2c-addc07339185",
  type: "page-type/track",
  slug: "rockapella-2-thats-the-way",
  ownLength: 3.4520166666666667,
  ownProgress: 3.4520166666666667,
  partOfCollections: ["release/rockapella-2"],
  status: "completed",
  unit: "unit/minutes",
  title: "That's the Way",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/rockapella" }],
  trackKey: "thatstheway|1AFSUleuDTapVhm5zUf4ix|207121",
  song: "song/rockapella-thats-the-way",
  carriedBy: [
    {
      release: "release/rockapella-2",
      discNumber: 1,
      position: 1,
      externalId: "2E5jNvwSF13BIfeXKB2BbV",
      externalLink: "https://open.spotify.com/track/2E5jNvwSF13BIfeXKB2BbV",
    },
  ],
} as const satisfies Track
