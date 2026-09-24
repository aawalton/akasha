import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const thePianoGuys310TitaniumPavane = {
  id: "01a0afa2-0c2b-73ff-a4cc-f0d13debac18",
  type: "page-type/track",
  slug: "the-piano-guys-3-10-titanium-pavane",
  ownLength: 4.804683333333333,
  ownProgress: 4.804683333333333,
  partOfCollections: ["release/the-piano-guys-3-10", "release/the-piano-guys-3-pop-on-piano"],
  status: "completed",
  unit: "unit/minutes",
  title: "Titanium / Pavane",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/the-piano-guys" }],
  trackKey: "titaniumpavane|0jW6R8CVyVohuUJVcuweDI|288281",
  song: "song/the-piano-guys-titanium-pavane",
  carriedBy: [
    {
      release: "release/the-piano-guys-3-10",
      discNumber: 2,
      position: 3,
      externalId: "2pRQWVXpdZ6BpQ106o7yma",
      externalLink: "https://open.spotify.com/track/2pRQWVXpdZ6BpQ106o7yma",
    },
    {
      release: "release/the-piano-guys-3-pop-on-piano",
      discNumber: 1,
      position: 9,
      externalId: "6OtJhd8UAocI8RY4fpBztO",
      externalLink: "https://open.spotify.com/track/6OtJhd8UAocI8RY4fpBztO",
    },
  ],
} as const satisfies Track
