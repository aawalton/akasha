import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3UnchartedHelloLacrimosa = {
  id: "01a0afa2-1198-7420-a81f-405ca14cc699",
  type: "page-type/track",
  slug: "the-piano-guys-3-uncharted-hello-lacrimosa",
  ownLength: 3.8625,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-uncharted"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5KaNi4AEXhiqfouONO5fM0",
      externalLink: "https://open.spotify.com/track/5KaNi4AEXhiqfouONO5fM0",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Hello / Lacrimosa",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "hellolacrimosa|0jW6R8CVyVohuUJVcuweDI|231750",
  song: "song/the-piano-guys-hello-lacrimosa",
} as const satisfies Track
