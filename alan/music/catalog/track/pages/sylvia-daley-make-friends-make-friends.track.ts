import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sylviaDaleyMakeFriendsMakeFriends = {
  id: "01a0a6c3-6b2d-7bfd-8952-54f22c0fb762",
  type: "page-type/track",
  slug: "sylvia-daley-make-friends-make-friends",
  ownLength: 2.7020833333333334,
  ownProgress: 0,
  partOfCollections: ["release/sylvia-daley-make-friends"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Make Friends",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/sylvia-daley" }],
  trackKey: "makefriends|03dXd2zBbBJvX60Oap8Lgo|162125",
  song: "song/sylvia-daley-make-friends",
  carriedBy: [
    {
      release: "release/sylvia-daley-make-friends",
      discNumber: 1,
      position: 1,
      externalId: "3qbJ0mWGjdVPAZJO565Zfo",
      externalLink: "https://open.spotify.com/track/3qbJ0mWGjdVPAZJO565Zfo",
    },
  ],
} as const satisfies Track
