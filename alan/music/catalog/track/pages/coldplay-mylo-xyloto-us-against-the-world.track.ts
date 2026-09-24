import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayMyloXylotoUsAgainstTheWorld = {
  id: "01a0b9ee-dc9f-780d-bbce-4648e03eea3b",
  type: "page-type/track",
  slug: "coldplay-mylo-xyloto-us-against-the-world",
  ownLength: 3.9961166666666665,
  ownProgress: 3.9961166666666665,
  partOfCollections: ["release/coldplay-mylo-xyloto"],
  status: "completed",
  unit: "unit/minutes",
  title: "Us Against the World",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "usagainsttheworld|4gzpq5DPGxSnKTe4SA8HAU|239767",
  song: "song/coldplay-us-against-the-world",
  carriedBy: [
    {
      release: "release/coldplay-mylo-xyloto",
      discNumber: 1,
      position: 5,
      externalId: "5zyfzNnBzN7f7PVkJFnW2g",
      externalLink: "https://open.spotify.com/track/5zyfzNnBzN7f7PVkJFnW2g",
    },
  ],
} as const satisfies Track
