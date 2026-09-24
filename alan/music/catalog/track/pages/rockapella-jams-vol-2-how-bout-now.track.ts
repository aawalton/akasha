import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const rockapellaJamsVol2HowBoutNow = {
  id: "01a0d52b-52de-7e60-983c-26fc5a484384",
  type: "page-type/track",
  slug: "rockapella-jams-vol-2-how-bout-now",
  ownLength: 3.5484666666666667,
  ownProgress: 0,
  partOfCollections: [
    "release/rockapella-jams-vol-2",
    "release/rockapella-where-in-the-world-is-carmen-sandiego-ep",
  ],
  status: "not-started",
  unit: "unit/minutes",
  title: "How Bout Now?",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/rockapella" }],
  trackKey: "howboutnow|1AFSUleuDTapVhm5zUf4ix|212908",
  song: "song/rockapella-how-bout-now",
  carriedBy: [
    {
      release: "release/rockapella-jams-vol-2",
      discNumber: 1,
      position: 2,
      externalId: "5M40ZhciCSAU3tIHcGA0Wv",
      externalLink: "https://open.spotify.com/track/5M40ZhciCSAU3tIHcGA0Wv",
    },
    {
      release: "release/rockapella-where-in-the-world-is-carmen-sandiego-ep",
      discNumber: 1,
      position: 6,
      externalId: "2KzthO88AYHq4pozU8qv9R",
      externalLink: "https://open.spotify.com/track/2KzthO88AYHq4pozU8qv9R",
    },
  ],
} as const satisfies Track
