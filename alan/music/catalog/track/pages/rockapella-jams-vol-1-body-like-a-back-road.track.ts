import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const rockapellaJamsVol1BodyLikeABackRoad = {
  id: "01a0d52b-52dd-7ccd-8f57-731d8ccfc822",
  type: "page-type/track",
  slug: "rockapella-jams-vol-1-body-like-a-back-road",
  ownLength: 1.2407666666666666,
  ownProgress: 0,
  partOfCollections: ["release/rockapella-jams-vol-1"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Body Like a Back Road",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/rockapella" }],
  trackKey: "bodylikeabackroad|1AFSUleuDTapVhm5zUf4ix|74446",
  song: "song/rockapella-body-like-a-back-road",
  carriedBy: [
    {
      release: "release/rockapella-jams-vol-1",
      discNumber: 1,
      position: 6,
      externalId: "0sXdEenTWHe4rzPUCuWXpd",
      externalLink: "https://open.spotify.com/track/0sXdEenTWHe4rzPUCuWXpd",
    },
  ],
} as const satisfies Track
