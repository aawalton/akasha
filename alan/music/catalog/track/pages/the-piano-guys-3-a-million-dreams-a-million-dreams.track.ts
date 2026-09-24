import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3AMillionDreamsAMillionDreams = {
  id: "01a0afa2-1dd0-7f1a-8f39-7061a7a5e807",
  type: "page-type/track",
  slug: "the-piano-guys-3-a-million-dreams-a-million-dreams",
  ownLength: 4.76395,
  ownProgress: 4.76395,
  partOfCollections: ["release/the-piano-guys-3-a-million-dreams"],
  status: "completed",
  unit: "unit/minutes",
  title: "A Million Dreams",
  trackType: "studio",
  explicit: false,
  trackArtist: [
    { artistName: "Benj Pasek" },
    { artistName: "Justin Paul" },
    { artist: "artist/the-piano-guys" },
  ],
  trackKey:
    "amilliondreams|0jW6R8CVyVohuUJVcuweDI,0qKRRwXdVtrVIEdPFr8vvo,1A2uplrPcSu6bqDaRp7Xs9|285837",
  song: "song/evynne-hollens-a-million-dreams",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-a-million-dreams",
      discNumber: 1,
      position: 1,
      externalId: "3Jj5Jho1NVrUXi9j6Nunf1",
      externalLink: "https://open.spotify.com/track/3Jj5Jho1NVrUXi9j6Nunf1",
    },
  ],
} as const satisfies Track
