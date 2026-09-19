import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3LiveAThousandYearsLive = {
  id: "01a0afa2-153b-7c19-94bd-487c18d44722",
  type: "page-type/track",
  slug: "the-piano-guys-3-live-a-thousand-years-live",
  ownLength: 4.644,
  ownProgress: 0,
  partOfCollections: ["release/the-piano-guys-3-live"],
  position: 17,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3JFrIRgNqkrwITPR5Y1DUd",
      externalLink: "https://open.spotify.com/track/3JFrIRgNqkrwITPR5Y1DUd",
      lastSyncedAt: "2026-09-17",
    },
  ],
  title: "A Thousand Years (Live)",
  trackType: "live",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "0jW6R8CVyVohuUJVcuweDI", artistName: "The Piano Guys" },
    { externalId: "3behdijGrqvmGolVpLXTLz", artistName: "Julie Nelson" },
  ],
  trackKey: "athousandyearslive|0jW6R8CVyVohuUJVcuweDI,3behdijGrqvmGolVpLXTLz|278640",
  song: "song/evynne-hollens-a-thousand-years",
} as const satisfies Track
