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
      statement:
        "Alan's categorization route is in akasha, answering from the readout rather than from Monarch.",
    },
    {
      invariantKind: "gap",
      statement: "The ring a categorize tile draws is in akasha.",
    },
    {
      invariantKind: "gap",
      statement: "The unreviewed transaction ring never displays an arc.",
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
      statement: "The credential that guards a readout route is in akasha.",
    },
    {
      invariantKind: "gap",
      statement: "The reading is taken by a process running on a workstation rather than by a pod.",
    },
    {
      invariantKind: "gap",
      statement: "Alan's unreviewed transaction iOS widget works.",
    },
    {
      invariantKind: "gap",
      statement: "The relay that carries Alan's reading to Jenny's site is in akasha.",
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
    "Jenny's tile shows Alan's Monarch reading relayed through his site, so every intent on his side comes before hers even though the end of the work is hers.",
    "Alan's path is a prefix of Jenny's, so his tile costs nothing beyond what hers already needs and is reached first.",
    "The readout page type, the scale and what the tile counts are all in akasha, so the stack starts at the readout itself.",
    "The reading is taken on a workstation because a pod cannot write the page store, and the endpoint that would let one is work of its own rather than this initiative's.",
    "What a readout shows when nothing is left is carried by the readout, so it arrived with the page type rather than as an intent of its own.",
    "The ring is drawn by one file both tiles share, so it moves once and serves both.",
    "Dropping the arc drops the fraction, and the fraction is the only reader of intake, so the wire narrows to the one count that is shown.",
    "The credential guarding a readout route waits on work being built elsewhere, so it sits beside the reading's taker rather than early.",
    "Deploys are broken today, so the intents naming a site or an app being put up are about that rather than about anything being written.",
  ],
} as const satisfies Initiative
