import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys3WondersFathersEyes = {
  id: "01a0afa2-15fa-7941-9645-7b8335d0b4b0",
  type: "page-type/track",
  slug: "the-piano-guys-3-wonders-fathers-eyes",
  ownLength: 3.9531,
  ownProgress: 3.9531,
  partOfCollections: ["release/the-piano-guys-3-wonders"],
  status: "completed",
  unit: "unit/minutes",
  title: "Fathers' Eyes",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "fatherseyes|0jW6R8CVyVohuUJVcuweDI|237186",
  song: "song/the-piano-guys-fathers-eyes",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-wonders",
      discNumber: 1,
      position: 4,
      externalId: "12sBT9hQ7GE9X72Nbem1ty",
      externalLink: "https://open.spotify.com/track/12sBT9hQ7GE9X72Nbem1ty",
    },
  ],
} as const satisfies Track
