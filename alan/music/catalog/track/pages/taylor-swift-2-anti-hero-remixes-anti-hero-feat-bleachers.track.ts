import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2AntiHeroRemixesAntiHeroFeatBleachers = {
  id: "01a0ce86-9db7-7372-9d38-d14906a8ec59",
  type: "page-type/track",
  slug: "taylor-swift-2-anti-hero-remixes-anti-hero-feat-bleachers",
  ownLength: 3.8066166666666668,
  ownProgress: 3.8066166666666668,
  partOfCollections: [
    "release/taylor-swift-2-anti-hero-remixes",
    "release/taylor-swift-2-anti-hero-feat-bleachers",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Anti-Hero (feat. Bleachers)",
  trackType: "studio",
  explicit: true,
  trackArtist: [
    { externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" },
    { externalId: "2eam0iDomRHGBypaDQLwWI", artistName: "Bleachers" },
  ],
  trackKey: "antiherofeatbleachers|06HL4z0CvFAxyc27GXpf02,2eam0iDomRHGBypaDQLwWI|228397",
  song: "song/taylor-swift-anti-hero",
  carriedBy: [
    {
      release: "release/taylor-swift-2-anti-hero-feat-bleachers",
      discNumber: 1,
      position: 1,
      externalId: "0j0gJqxitjhmmkrW56dtQH",
      externalLink: "https://open.spotify.com/track/0j0gJqxitjhmmkrW56dtQH",
    },
    {
      release: "release/taylor-swift-2-anti-hero-remixes",
      discNumber: 1,
      position: 1,
      externalId: "16M9Rxid0nXhVmme7lzVwN",
      externalLink: "https://open.spotify.com/track/16M9Rxid0nXhVmme7lzVwN",
    },
  ],
} as const satisfies Track
