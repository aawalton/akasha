import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuysAutumnOnPianoMusicBoxDancer = {
  id: "01a0afa1-c001-739b-b2fe-55c0a66df53c",
  type: "page-type/track",
  slug: "the-piano-guys-autumn-on-piano-music-box-dancer",
  ownLength: 2.716266666666667,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-autumn-on-piano"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0IIaVGAyu8xPzPbtmnwGcL",
      externalLink: "https://open.spotify.com/track/0IIaVGAyu8xPzPbtmnwGcL",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Music Box Dancer",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "musicboxdancer|0jW6R8CVyVohuUJVcuweDI|162976",
  song: "song/the-piano-guys-music-box-dancer",
} as const satisfies Track
