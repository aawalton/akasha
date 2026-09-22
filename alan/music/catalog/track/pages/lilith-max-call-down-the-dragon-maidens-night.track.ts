import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const lilithMaxCallDownTheDragonMaidensNight = {
  id: "01a0c95d-feaa-72ea-8184-e13abdc11d89",
  type: "page-type/track",
  slug: "lilith-max-call-down-the-dragon-maidens-night",
  ownLength: 3.3768666666666665,
  ownProgress: 3.3768666666666665,
  partOfCollections: [
    "release/lilith-max-call-down-the-dragon",
    "release/lilith-max-maiden-s-night",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Maiden's Night",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "797SPxZf82IYq3XCM8c9AM", artistName: "Lilith Max" }],
  trackKey: "maidensnight|797SPxZf82IYq3XCM8c9AM|202612",
  song: "song/lilith-max-maiden-s-night",
  carriedBy: [
    {
      release: "release/lilith-max-call-down-the-dragon",
      discNumber: 1,
      position: 2,
      externalId: "3t2ib3s0KzOK12DluCO9wr",
      externalLink: "https://open.spotify.com/track/3t2ib3s0KzOK12DluCO9wr",
    },
    {
      release: "release/lilith-max-maiden-s-night",
      discNumber: 1,
      position: 1,
      externalId: "5lMoRPtT8AmqckNyzOQ2xl",
      externalLink: "https://open.spotify.com/track/5lMoRPtT8AmqckNyzOQ2xl",
    },
  ],
} as const satisfies Track
