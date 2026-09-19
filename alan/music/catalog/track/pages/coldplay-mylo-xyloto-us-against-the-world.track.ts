import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayMyloXylotoUsAgainstTheWorld = {
  id: "01a0b9ee-dc9f-780d-bbce-4648e03eea3b",
  type: "page-type/track",
  slug: "coldplay-mylo-xyloto-us-against-the-world",
  ownLength: 3.9961166666666665,
  ownProgress: 0,
  partOfCollections: ["release/coldplay-mylo-xyloto"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5zyfzNnBzN7f7PVkJFnW2g",
      externalLink: "https://open.spotify.com/track/5zyfzNnBzN7f7PVkJFnW2g",
      lastSyncedAt: "2026-09-19",
    },
  ],
  title: "Us Against the World",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "4gzpq5DPGxSnKTe4SA8HAU", artistName: "Coldplay" }],
  trackKey: "usagainsttheworld|4gzpq5DPGxSnKTe4SA8HAU|239767",
} as const satisfies Track
