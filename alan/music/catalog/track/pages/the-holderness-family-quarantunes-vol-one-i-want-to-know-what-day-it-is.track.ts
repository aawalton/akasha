import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const theHoldernessFamilyQuarantunesVolOneIWantToKnowWhatDayItIs = {
  id: "01a0b4c6-cac4-79ec-8ba1-5902095e996b",
  type: "page-type/track",
  slug: "the-holderness-family-quarantunes-vol-one-i-want-to-know-what-day-it-is",
  ownLength: 3.7773,
  ownProgress: 0,
  partOfCollections: ["release/the-holderness-family-quarantunes-vol-one"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4Hs2b73YOpMYOG4bHiD5BT",
      externalLink: "https://open.spotify.com/track/4Hs2b73YOpMYOG4bHiD5BT",
      lastSyncedAt: "2026-09-18",
    },
  ],
  title: "I Want to Know What Day It Is",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "6tITG4T8LpC0msapZ4wXGA", artistName: "The Holderness Family" }],
  trackKey: "iwanttoknowwhatdayitis|6tITG4T8LpC0msapZ4wXGA|226638",
  song: "song/the-holderness-family-i-want-to-know-what-day-it-is",
} as const satisfies Track
