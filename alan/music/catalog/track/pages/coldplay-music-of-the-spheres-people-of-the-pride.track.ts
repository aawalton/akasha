import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const coldplayMusicOfTheSpheresPeopleOfThePride = {
  id: "01a0b9ee-cdea-7543-9d79-5601ddf34d9e",
  type: "page-type/track",
  slug: "coldplay-music-of-the-spheres-people-of-the-pride",
  ownLength: 3.6211,
  ownProgress: 3.6211,
  partOfCollections: ["release/coldplay-music-of-the-spheres"],
  status: "completed",
  unit: "unit/minutes",
  title: "People of The Pride",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ artist: "artist/coldplay" }],
  trackKey: "peopleofthepride|4gzpq5DPGxSnKTe4SA8HAU|217266",
  song: "song/coldplay-people-of-the-pride",
  carriedBy: [
    {
      release: "release/coldplay-music-of-the-spheres",
      discNumber: 1,
      position: 7,
      externalId: "5ophZLHA9mwSZhQSmboyDN",
      externalLink: "https://open.spotify.com/track/5ophZLHA9mwSZhQSmboyDN",
    },
  ],
} as const satisfies Track
