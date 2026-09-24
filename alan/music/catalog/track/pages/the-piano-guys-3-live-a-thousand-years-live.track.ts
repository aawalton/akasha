import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3LiveAThousandYearsLive = {
  id: "01a0afa2-153b-7c19-94bd-487c18d44722",
  type: "page-type/track",
  slug: "the-piano-guys-3-live-a-thousand-years-live",
  ownLength: 4.644,
  ownProgress: 4.644,
  partOfCollections: ["release/the-piano-guys-3-live"],
  status: "completed",
  unit: "unit/minutes",
  title: "A Thousand Years (Live)",
  trackType: "live",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }, { artistName: "Julie Nelson" }],
  trackKey: "athousandyearslive|0jW6R8CVyVohuUJVcuweDI,3behdijGrqvmGolVpLXTLz|278640",
  song: "song/evynne-hollens-a-thousand-years",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-live",
      discNumber: 1,
      position: 17,
      externalId: "3JFrIRgNqkrwITPR5Y1DUd",
      externalLink: "https://open.spotify.com/track/3JFrIRgNqkrwITPR5Y1DUd",
    },
  ],
} as const satisfies Track
