import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const pentatonixBeMyEyesBeMyEyes = {
  id: "01a1546f-24f4-72c1-a69f-e37d068cb503",
  type: "page-type/track",
  slug: "pentatonix-be-my-eyes-be-my-eyes",
  ownLength: 3.4044333333333334,
  ownProgress: 3.4044333333333334,
  partOfCollections: ["release/pentatonix-be-my-eyes"],
  status: "completed",
  unit: "unit/minutes",
  title: "Be My Eyes",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/pentatonix" }],
  trackKey: "bemyeyes|26AHtbjWKiwYzsoGoUZq53|204266",
  song: "song/pentatonix-be-my-eyes",
  carriedBy: [
    {
      release: "release/pentatonix-be-my-eyes",
      discNumber: 1,
      position: 1,
      externalId: "5Oov3nQ9w3jX2agErbQgQu",
      externalLink: "https://open.spotify.com/track/5Oov3nQ9w3jX2agErbQgQu",
    },
  ],
  createdAt: "2026-10-19T13:52:12.521Z",
  updatedAt: "2026-10-19T14:01:21.162Z",
  progressedAt: "2026-10-19T14:01:21.162Z",
} as const satisfies Track
