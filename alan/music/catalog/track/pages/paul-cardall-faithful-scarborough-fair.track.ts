import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallFaithfulScarboroughFair = {
  id: "01a0b4c8-59c3-7040-83a4-133647c9cec2",
  type: "page-type/track",
  slug: "paul-cardall-faithful-scarborough-fair",
  ownLength: 3.713766666666667,
  ownProgress: 3.713766666666667,
  partOfCollections: ["release/paul-cardall-faithful", "release/paul-cardall-saving-tiny-hearts"],
  status: "completed",
  unit: "unit/minutes",
  title: "Scarborough Fair",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }],
  trackKey: "scarboroughfair|7FQRbf8gbKw8KZQZAJWxH2|222826",
  song: "song/paul-cardall-scarborough-fair",
  carriedBy: [
    {
      release: "release/paul-cardall-faithful",
      discNumber: 1,
      position: 4,
      externalId: "2SBbX0Yvk7JhkBqEdIzLru",
      externalLink: "https://open.spotify.com/track/2SBbX0Yvk7JhkBqEdIzLru",
    },
    {
      release: "release/paul-cardall-saving-tiny-hearts",
      discNumber: 1,
      position: 10,
      externalId: "47SHSVRz8fEVfssJ3Z6wlS",
      externalLink: "https://open.spotify.com/track/47SHSVRz8fEVfssJ3Z6wlS",
    },
  ],
} as const satisfies Track
