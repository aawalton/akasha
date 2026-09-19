import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3ChristmasTogetherSilentNightHolyNightFeatPlacidoDomingo = {
  id: "01a0afa2-10c8-7d3b-83ee-ece5b123a552",
  type: "page-type/track",
  slug: "the-piano-guys-3-christmas-together-silent-night-holy-night-feat-placido-domingo",
  ownLength: 3.4854166666666666,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-christmas-together"],
  position: 9,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6L4RnRbVdspEJ8HMibsiNH",
      externalLink: "https://open.spotify.com/track/6L4RnRbVdspEJ8HMibsiNH",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Silent Night, Holy Night (feat. Plácido Domingo)",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" },
    { externalId: "4pU3BpenOZFEBzORx2YBJW", artistName: "Plácido Domingo" },
  ],
  trackKey:
    "silentnightholynightfeatplacidodomingo|0jW6R8CVyVohuUJVcuweDI,4pU3BpenOZFEBzORx2YBJW|209125",
  song: "song/the-piano-guys-silent-night-holy-night",
} as const satisfies Track
