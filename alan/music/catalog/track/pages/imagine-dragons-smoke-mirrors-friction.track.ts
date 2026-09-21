import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsSmokeMirrorsFriction = {
  id: "01a0c43f-d32d-7718-bb5a-427e2a1043af",
  type: "page-type/track",
  slug: "imagine-dragons-smoke-mirrors-friction",
  ownLength: 3.3633333333333333,
  ownProgress: 3.3633333333333333,
  partOfCollections: ["release/imagine-dragons-smoke-mirrors"],
  position: 7,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2iIb73Qn02LsZwpW8RJUxh",
      externalLink: "https://open.spotify.com/track/2iIb73Qn02LsZwpW8RJUxh",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "Friction",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "53XhwfbYqKCa1cC15pYq2q", artistName: "Imagine Dragons" }],
  trackKey: "friction|53XhwfbYqKCa1cC15pYq2q|201800",
  song: "song/imagine-dragons-friction",
  carriedBy: [
    {
      release: "release/imagine-dragons-smoke-mirrors",
      discNumber: 1,
      position: 7,
      externalId: "2iIb73Qn02LsZwpW8RJUxh",
      externalLink: "https://open.spotify.com/track/2iIb73Qn02LsZwpW8RJUxh",
    },
  ],
} as const satisfies Track
