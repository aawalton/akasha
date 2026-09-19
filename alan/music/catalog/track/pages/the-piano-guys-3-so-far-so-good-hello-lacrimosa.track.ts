import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3SoFarSoGoodHelloLacrimosa = {
  id: "01a0afa2-1c18-7e8f-8257-c9453faa8315",
  type: "page-type/track",
  slug: "the-piano-guys-3-so-far-so-good-hello-lacrimosa",
  ownLength: 3.860316666666667,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-so-far-so-good"],
  position: 10,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4MPDpYXCgo66NCbUbdch88",
      externalLink: "https://open.spotify.com/track/4MPDpYXCgo66NCbUbdch88",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Hello / Lacrimosa",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "hellolacrimosa|0jW6R8CVyVohuUJVcuweDI|231619",
  song: "song/the-piano-guys-hello-lacrimosa",
} as const satisfies Track
