import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const sabrinaCarpenterAlienDarkHeartRemixAlienDarkHeartRemix = {
  id: "01a0b111-3187-7708-82f9-f153e1b33d1b",
  type: "page-type/track",
  slug: "sabrina-carpenter-alien-dark-heart-remix-alien-dark-heart-remix",
  ownLength: 3.49055,
  ownProgress: 0,
  partOfCollections: ["release/sabrina-carpenter-alien-dark-heart-remix"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4m3x28otCU0jIgDwng7hAo",
      externalLink: "https://open.spotify.com/track/4m3x28otCU0jIgDwng7hAo",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Alien - Dark Heart Remix",
  trackType: "remix",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "74KM79TiuVKeVCqs8QtB0B", artistName: "Sabrina Carpenter" },
    { externalId: "1HBjj22wzbscIZ9sEb5dyf", artistName: "Jonas Blue" },
    { externalId: "1k7Cc2WGh6LAE1TUh6dsiy", artistName: "Dark Heart" },
  ],
  trackKey:
    "aliendarkheartremix|1HBjj22wzbscIZ9sEb5dyf,1k7Cc2WGh6LAE1TUh6dsiy,74KM79TiuVKeVCqs8QtB0B|209433",
  song: "song/sabrina-carpenter-alien",
} as const satisfies Track
