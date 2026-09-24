import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsLoomEyesClosedFeatJBalvin = {
  id: "01a0c43f-b5b6-79b6-823c-e31ef923559b",
  type: "page-type/track",
  slug: "imagine-dragons-loom-eyes-closed-feat-j-balvin",
  ownLength: 3.33355,
  ownProgress: 3.33355,
  partOfCollections: ["release/imagine-dragons-loom"],
  status: "completed",
  unit: "unit/minutes",
  title: "Eyes Closed (feat. J Balvin)",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/imagine-dragons" }, { artistName: "J Balvin" }],
  trackKey: "eyesclosedfeatjbalvin|1vyhD5VmyZ7KMfW5gqLgo5,53XhwfbYqKCa1cC15pYq2q|200013",
  song: "song/imagine-dragons-eyes-closed",
  carriedBy: [
    {
      release: "release/imagine-dragons-loom",
      discNumber: 1,
      position: 10,
      externalId: "2jP56WTCglcD8lBh9wwTUA",
      externalLink: "https://open.spotify.com/track/2jP56WTCglcD8lBh9wwTUA",
    },
  ],
} as const satisfies Track
