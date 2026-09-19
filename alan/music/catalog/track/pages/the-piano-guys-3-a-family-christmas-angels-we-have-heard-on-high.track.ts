import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3AFamilyChristmasAngelsWeHaveHeardOnHigh = {
  id: "01a0afa2-171b-7cdb-812e-ce9058696e07",
  type: "page-type/track",
  slug: "the-piano-guys-3-a-family-christmas-angels-we-have-heard-on-high",
  ownLength: 3.5456833333333333,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-a-family-christmas"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2S96r2pepRxVn0bw74dcZn",
      externalLink: "https://open.spotify.com/track/2S96r2pepRxVn0bw74dcZn",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Angels We Have Heard on High",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "1U5zgr455OGyIkLNXvDdrf", artistName: "Traditional" },
    { externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" },
  ],
  trackKey: "angelswehaveheardonhigh|0jW6R8CVyVohuUJVcuweDI,1U5zgr455OGyIkLNXvDdrf|212741",
  song: "song/the-piano-guys-angels-we-have-heard-on-high",
} as const satisfies Track
