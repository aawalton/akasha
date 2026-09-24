import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const yaelokreHayfieldsHartebeest = {
  id: "01a0ce87-1721-777d-b129-e506b81c7162",
  type: "page-type/track",
  slug: "yaelokre-hayfields-hartebeest",
  ownLength: 4.2434666666666665,
  ownProgress: 4.2434666666666665,
  partOfCollections: ["release/yaelokre-hayfields", "release/yaelokre-hartebeest"],
  status: "completed",
  unit: "unit/minutes",
  title: "Hartebeest",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/yaelokre" }],
  trackKey: "hartebeest|3rRyfgGByetsaaujkjQ7rY|254608",
  song: "song/yaelokre-hartebeest",
  carriedBy: [
    {
      release: "release/yaelokre-hartebeest",
      discNumber: 1,
      position: 1,
      externalId: "2q5Ljhrh4h8mQUCbDrbqx1",
      externalLink: "https://open.spotify.com/track/2q5Ljhrh4h8mQUCbDrbqx1",
    },
    {
      release: "release/yaelokre-hayfields",
      discNumber: 1,
      position: 1,
      externalId: "2wTtv6vlH0IwQZVFBN4Fua",
      externalLink: "https://open.spotify.com/track/2wTtv6vlH0IwQZVFBN4Fua",
    },
  ],
} as const satisfies Track
