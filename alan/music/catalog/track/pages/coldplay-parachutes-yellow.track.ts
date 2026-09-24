import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayParachutesYellow = {
  id: "01a0b9ee-e9c4-7a3f-8a9f-2977122c9652",
  type: "page-type/track",
  slug: "coldplay-parachutes-yellow",
  ownLength: 4.4462166666666665,
  ownProgress: 4.4462166666666665,
  partOfCollections: ["release/coldplay-parachutes", "release/coldplay-yellow"],
  status: "completed",
  unit: "unit/minutes",
  title: "Yellow",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "yellow|4gzpq5DPGxSnKTe4SA8HAU|266773",
  song: "song/coldplay-yellow",
  carriedBy: [
    {
      release: "release/coldplay-parachutes",
      discNumber: 1,
      position: 5,
      externalId: "3AJwUDP919kvQ9QcozQPxg",
      externalLink: "https://open.spotify.com/track/3AJwUDP919kvQ9QcozQPxg",
    },
    {
      release: "release/coldplay-yellow",
      discNumber: 1,
      position: 1,
      externalId: "3e0wYnFxkqinmtXebYPMSt",
      externalLink: "https://open.spotify.com/track/3e0wYnFxkqinmtXebYPMSt",
    },
  ],
} as const satisfies Track
