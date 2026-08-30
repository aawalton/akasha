import type { Initiative } from "../initiative.page-type.ts"

export const amyJennyUnreviewedWidget = {
  id: "01a05431-37d9-7a21-ad2f-423df6ef1ac1",
  pageTypeSlug: "initiative",
  slug: "amy-jenny-unreviewed-widget",
  domainSlug: "domain/alan-harness",
  personaSlug: "amy",
  parentSlug: "akasha-migration",
  invariants: [
    {
      invariantKind: "gap",
      statement: "The cache that holds a ring reading between calls is in akasha.",
    },
    {
      invariantKind: "gap",
      statement: "The scale a backlog count is read against is in akasha.",
    },
    {
      invariantKind: "gap",
      statement: "What a readout shows when nothing is left is in akasha.",
    },
    {
      invariantKind: "gap",
      statement: "The credential that guards a readout route is in akasha.",
    },
    {
      invariantKind: "gap",
      statement: "Alan's categorization route is in akasha.",
    },
    {
      invariantKind: "gap",
      statement: "The ring a categorize tile draws is in akasha.",
    },
    {
      invariantKind: "gap",
      statement: "The page describing Alan's tile is in akasha.",
    },
    {
      invariantKind: "gap",
      statement: "Alan's site deploys from akasha.",
    },
    {
      invariantKind: "gap",
      statement: "Alan's iOS app is built from akasha.",
    },
    {
      invariantKind: "gap",
      statement: "Alan's unreviewed transaction iOS widget works.",
    },
    {
      invariantKind: "gap",
      statement: "The relay that carries Alan's counts to Jenny's site is in akasha.",
    },
    {
      invariantKind: "gap",
      statement: "Jenny's categorization route is in akasha.",
    },
    {
      invariantKind: "gap",
      statement: "The page describing Jenny's tile is in akasha.",
    },
    {
      invariantKind: "gap",
      statement: "Jenny's site deploys from akasha.",
    },
    {
      invariantKind: "gap",
      statement: "Jenny's iOS app is built from akasha.",
    },
    {
      invariantKind: "gap",
      statement: "Jenny's unreviewed transaction iOS widget works.",
    },
  ],
  notes: [
    "Jenny's tile shows Alan's Monarch counts relayed through his site, so every intent on his side comes before hers even though the end of the work is hers.",
    "Alan's path is a prefix of Jenny's, so his tile costs nothing beyond what hers already needs and is reached first.",
    "What the tile counts is already in akasha, so the stack starts at what reads that rather than at Monarch.",
    "Alan's route cannot move before what it reads has moved: the cache, the scale, the none-left words and the credential are each read by it.",
    "The ring is drawn by one file both tiles share, so it moves once and serves both.",
    "Deploys are broken today, so the intents naming a site or an app being put up are about that rather than about anything being written.",
  ],
} as const satisfies Initiative
