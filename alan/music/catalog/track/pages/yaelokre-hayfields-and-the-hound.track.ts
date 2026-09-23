import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const yaelokreHayfieldsAndTheHound = {
  id: "01a0ce87-16cb-7577-9c0f-c837a5ba570f",
  type: "page-type/track",
  slug: "yaelokre-hayfields-and-the-hound",
  ownLength: 3.38925,
  ownProgress: 0,
  partOfCollections: ["release/yaelokre-hayfields", "release/yaelokre-and-the-hound"],
  status: "not-started",
  unit: "unit/minutes",
  title: "And the Hound",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "3rRyfgGByetsaaujkjQ7rY", artistName: "Yaelokre" }],
  trackKey: "andthehound|3rRyfgGByetsaaujkjQ7rY|203355",
  song: "song/yaelokre-and-the-hound",
  carriedBy: [
    {
      release: "release/yaelokre-and-the-hound",
      discNumber: 1,
      position: 1,
      externalId: "7K59Lt75PBN9VISevo3eYC",
      externalLink: "https://open.spotify.com/track/7K59Lt75PBN9VISevo3eYC",
    },
    {
      release: "release/yaelokre-hayfields",
      discNumber: 1,
      position: 3,
      externalId: "0L074h3NOjXSqi0D6RFDIF",
      externalLink: "https://open.spotify.com/track/0L074h3NOjXSqi0D6RFDIF",
    },
  ],
} as const satisfies Track
