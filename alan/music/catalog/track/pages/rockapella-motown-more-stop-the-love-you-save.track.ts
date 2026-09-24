import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const rockapellaMotownMoreStopTheLoveYouSave = {
  id: "01a0d52b-52de-7224-9127-cfa3768c2d3b",
  type: "page-type/track",
  slug: "rockapella-motown-more-stop-the-love-you-save",
  ownLength: 1.54385,
  ownProgress: 1.54385,
  partOfCollections: ["release/rockapella-motown-more"],
  status: "completed",
  unit: "unit/minutes",
  title: "(Stop) the Love You Save",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/rockapella" }],
  trackKey: "stoptheloveyousave|1AFSUleuDTapVhm5zUf4ix|92631",
  song: "song/rockapella-stop-the-love-you-save",
  carriedBy: [
    {
      release: "release/rockapella-motown-more",
      discNumber: 1,
      position: 4,
      externalId: "49KbUBzwuQXRaixpRsRGkz",
      externalLink: "https://open.spotify.com/track/49KbUBzwuQXRaixpRsRGkz",
    },
  ],
} as const satisfies Track
