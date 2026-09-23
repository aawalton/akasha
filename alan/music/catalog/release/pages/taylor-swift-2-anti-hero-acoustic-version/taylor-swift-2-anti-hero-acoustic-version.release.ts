import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const taylorSwift2AntiHeroAcousticVersion = {
  id: "01a0676a-d717-7026-a77b-b2c09061b8f3",
  type: "page-type/release",
  slug: "taylor-swift-2-anti-hero-acoustic-version",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/taylor-swift"],
  position: 0,
  publishedAt: "2022-11-25",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5vgWXUueeEU2labRz6TlNv",
      externalLink: "https://open.spotify.com/album/5vgWXUueeEU2labRz6TlNv",
    },
  ],
  title: "Anti-Hero (Acoustic Version)",
} as const satisfies Release
