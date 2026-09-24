import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallTheBrokenMiracleFindingMyWay = {
  id: "01a0b4c8-3083-77e7-9a8d-1187578edac9",
  type: "page-type/track",
  slug: "paul-cardall-the-broken-miracle-finding-my-way",
  ownLength: 4.384666666666667,
  ownProgress: 4.384666666666667,
  partOfCollections: ["release/paul-cardall-the-broken-miracle"],
  status: "completed",
  unit: "unit/minutes",
  title: "Finding My Way",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "findingmyway|7FQRbf8gbKw8KZQZAJWxH2|263080",
  song: "song/paul-cardall-finding-my-way",
  carriedBy: [
    {
      release: "release/paul-cardall-the-broken-miracle",
      discNumber: 1,
      position: 14,
      externalId: "7L7yuHRdDG5B5QHus6wSwb",
      externalLink: "https://open.spotify.com/track/7L7yuHRdDG5B5QHus6wSwb",
    },
  ],
} as const satisfies Track
