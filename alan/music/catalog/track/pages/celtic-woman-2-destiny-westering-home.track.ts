import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const celticWoman2DestinyWesteringHome = {
  id: "01a0abea-6974-7ad6-b091-f666713448a3",
  type: "page-type/track",
  slug: "celtic-woman-2-destiny-westering-home",
  ownLength: 4.0072833333333335,
  ownProgress: 4.0072833333333335,
  partOfCollections: ["release/celtic-woman-2-destiny"],
  status: "completed",
  unit: "unit/minutes",
  title: "Westering Home",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/celtic-woman" }],
  trackKey: "westeringhome|6NWtt9pNOL2Gx7kBykdE5x|240437",
  song: "song/celtic-woman-westering-home",
  carriedBy: [
    {
      release: "release/celtic-woman-2-destiny",
      discNumber: 1,
      position: 12,
      externalId: "4EH5q3H8IML9zFITI2igOC",
      externalLink: "https://open.spotify.com/track/4EH5q3H8IML9zFITI2igOC",
    },
  ],
} as const satisfies Track
