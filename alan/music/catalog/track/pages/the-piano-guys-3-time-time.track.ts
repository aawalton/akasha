import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3TimeTime = {
  id: "01a0afa1-e366-7c4d-8457-8799637d3924",
  type: "page-type/track",
  slug: "the-piano-guys-3-time-time",
  ownLength: 4.2,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-time"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1EVJvqORoxiNMgjScE7fhl",
      externalLink: "https://open.spotify.com/track/1EVJvqORoxiNMgjScE7fhl",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Time",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "time|0jW6R8CVyVohuUJVcuweDI|252000",
} as const satisfies Track
