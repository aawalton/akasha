import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys310SomeoneYouLoved = {
  id: "01a0afa2-0b17-7570-909c-c1753442342f",
  type: "page-type/track",
  slug: "the-piano-guys-3-10-someone-you-loved",
  ownLength: 3.3857,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-10"],
  position: 7,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2sindV5MPoBIkAW02OFtHF",
      externalLink: "https://open.spotify.com/track/2sindV5MPoBIkAW02OFtHF",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "Someone You Loved",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" }],
  trackKey: "someoneyouloved|0jW6R8CVyVohuUJVcuweDI|203142",
} as const satisfies Track
