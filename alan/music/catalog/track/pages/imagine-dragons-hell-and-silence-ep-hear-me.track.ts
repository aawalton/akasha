import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const imagineDragonsHellAndSilenceEpHearMe = {
  id: "01a0c43f-e619-74f2-91e4-af2c742ab4d0",
  type: "page-type/track",
  slug: "imagine-dragons-hell-and-silence-ep-hear-me",
  ownLength: 3.9102166666666665,
  ownProgress: 3.9102166666666665,
  partOfCollections: ["release/imagine-dragons-hell-and-silence-ep"],
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2f79dv47Mo69MCPnV9JNWq",
      externalLink: "https://open.spotify.com/track/2f79dv47Mo69MCPnV9JNWq",
      lastSyncedAt: "2026-09-21",
    },
  ],
  title: "Hear Me",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "53XhwfbYqKCa1cC15pYq2q", artistName: "Imagine Dragons" }],
  trackKey: "hearme|53XhwfbYqKCa1cC15pYq2q|234613",
  song: "song/imagine-dragons-hear-me",
  carriedBy: [
    {
      release: "release/imagine-dragons-hell-and-silence-ep",
      discNumber: 1,
      position: 3,
      externalId: "2f79dv47Mo69MCPnV9JNWq",
      externalLink: "https://open.spotify.com/track/2f79dv47Mo69MCPnV9JNWq",
    },
  ],
} as const satisfies Track
