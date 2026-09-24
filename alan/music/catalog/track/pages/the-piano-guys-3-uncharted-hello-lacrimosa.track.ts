import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3UnchartedHelloLacrimosa = {
  id: "01a0afa2-1198-7420-a81f-405ca14cc699",
  type: "page-type/track",
  slug: "the-piano-guys-3-uncharted-hello-lacrimosa",
  ownLength: 3.8625,
  ownProgress: 3.8625,
  partOfCollections: ["release/the-piano-guys-3-uncharted"],
  status: "completed",
  unit: "unit/minutes",
  title: "Hello / Lacrimosa",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "hellolacrimosa|0jW6R8CVyVohuUJVcuweDI|231750",
  song: "song/the-piano-guys-hello-lacrimosa",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-uncharted",
      discNumber: 1,
      position: 3,
      externalId: "5KaNi4AEXhiqfouONO5fM0",
      externalLink: "https://open.spotify.com/track/5KaNi4AEXhiqfouONO5fM0",
    },
  ],
} as const satisfies Track
