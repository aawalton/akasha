import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3ThePianoGuys2MissionImpossibleFeatLindseyStirling = {
  id: "01a0afa2-2010-7883-a759-87ec5be9d55f",
  type: "page-type/track",
  slug: "the-piano-guys-3-the-piano-guys-2-mission-impossible-feat-lindsey-stirling",
  ownLength: 3.7666666666666666,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-the-piano-guys-2"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "49q8tEVP92m9yUxmZ2j2nc",
      externalLink: "https://open.spotify.com/track/49q8tEVP92m9yUxmZ2j2nc",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Mission Impossible (feat. Lindsey Stirling)",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" },
    { externalId: "378dH6EszOLFShpRzAQkVM", artistName: "Lindsey Stirling" },
  ],
  trackKey:
    "missionimpossiblefeatlindseystirling|0jW6R8CVyVohuUJVcuweDI,378dH6EszOLFShpRzAQkVM|226000",
  song: "song/the-piano-guys-mission-impossible",
} as const satisfies Track
