import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsMercuryActs12Giants = {
  id: "01a0c43f-c369-7868-b8c3-2002653c4207",
  type: "page-type/track",
  slug: "imagine-dragons-mercury-acts-1-2-giants",
  ownLength: 3.5067,
  ownProgress: 3.5067,
  partOfCollections: ["release/imagine-dragons-mercury-acts-1-2"],
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5HmxrDC6RrpkCDtMYQqkqx",
      externalLink: "https://open.spotify.com/track/5HmxrDC6RrpkCDtMYQqkqx",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "Giants",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "53XhwfbYqKCa1cC15pYq2q", artistName: "Imagine Dragons" }],
  trackKey: "giants|53XhwfbYqKCa1cC15pYq2q|210402",
  song: "song/imagine-dragons-giants",
  carriedBy: [
    {
      release: "release/imagine-dragons-mercury-acts-1-2",
      discNumber: 1,
      position: 8,
      externalId: "5HmxrDC6RrpkCDtMYQqkqx",
      externalLink: "https://open.spotify.com/track/5HmxrDC6RrpkCDtMYQqkqx",
    },
  ],
} as const satisfies Track
