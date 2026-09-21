import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsMercuryActs12Bones = {
  id: "01a0c43f-c49e-7a5c-b0ee-deea58e4e60d",
  type: "page-type/track",
  slug: "imagine-dragons-mercury-acts-1-2-bones",
  ownLength: 2.7544,
  ownProgress: 2.7544,
  partOfCollections: ["release/imagine-dragons-mercury-acts-1-2"],
  position: 1,
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "54ipXppHLA8U4yqpOFTUhr",
      externalLink: "https://open.spotify.com/track/54ipXppHLA8U4yqpOFTUhr",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "Bones",
  trackType: "studio",
  discNumber: 2,
  explicit: false,
  trackArtist: [{ externalId: "53XhwfbYqKCa1cC15pYq2q", artistName: "Imagine Dragons" }],
  trackKey: "bones|53XhwfbYqKCa1cC15pYq2q|165264",
  song: "song/imagine-dragons-bones",
  carriedBy: [
    {
      release: "release/imagine-dragons-mercury-acts-1-2",
      discNumber: 2,
      position: 1,
      externalId: "54ipXppHLA8U4yqpOFTUhr",
      externalLink: "https://open.spotify.com/track/54ipXppHLA8U4yqpOFTUhr",
    },
  ],
} as const satisfies Track
