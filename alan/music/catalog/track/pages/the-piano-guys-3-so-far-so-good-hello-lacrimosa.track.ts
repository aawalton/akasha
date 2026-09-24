import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3SoFarSoGoodHelloLacrimosa = {
  id: "01a0afa2-1c18-7e8f-8257-c9453faa8315",
  type: "page-type/track",
  slug: "the-piano-guys-3-so-far-so-good-hello-lacrimosa",
  ownLength: 3.860316666666667,
  ownProgress: 3.860316666666667,
  partOfCollections: ["release/the-piano-guys-3-so-far-so-good"],
  status: "completed",
  unit: "unit/minutes",
  title: "Hello / Lacrimosa",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "hellolacrimosa|0jW6R8CVyVohuUJVcuweDI|231619",
  song: "song/the-piano-guys-hello-lacrimosa",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-so-far-so-good",
      discNumber: 1,
      position: 10,
      externalId: "4MPDpYXCgo66NCbUbdch88",
      externalLink: "https://open.spotify.com/track/4MPDpYXCgo66NCbUbdch88",
    },
  ],
} as const satisfies Track
