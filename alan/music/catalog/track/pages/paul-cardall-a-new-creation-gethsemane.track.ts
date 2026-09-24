import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const paulCardallANewCreationGethsemane = {
  id: "01a0b4c8-3671-7d08-b50f-ee807c21da73",
  type: "page-type/track",
  slug: "paul-cardall-a-new-creation-gethsemane",
  ownLength: 3.5733333333333333,
  ownProgress: 3.5733333333333333,
  partOfCollections: ["release/paul-cardall-a-new-creation"],
  status: "completed",
  unit: "unit/minutes",
  title: "Gethsemane",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/paul-cardall" }, { artistName: "Nathan Pacheco" }],
  trackKey: "gethsemane|6WfsgevyXjoFI4tT5ghvhV,7FQRbf8gbKw8KZQZAJWxH2|214400",
  song: "song/paul-cardall-gethsemane",
  carriedBy: [
    {
      release: "release/paul-cardall-a-new-creation",
      discNumber: 1,
      position: 8,
      externalId: "067fdHLUlMJYn9gav9gExG",
      externalLink: "https://open.spotify.com/track/067fdHLUlMJYn9gav9gExG",
    },
  ],
} as const satisfies Track
