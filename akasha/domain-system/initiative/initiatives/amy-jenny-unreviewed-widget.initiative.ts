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
      statement: "Alan's site deploys from akasha.",
    },
    {
      invariantKind: "gap",
      statement: "Alan's iOS app is built from akasha.",
    },
    {
      invariantKind: "gap",
      statement: "The reading is taken by a process running on a workstation rather than by a pod.",
    },
    {
      invariantKind: "gap",
      statement:
        "Alan's categorization route in akasha answers from the readout rather than from Monarch.",
    },
    {
      invariantKind: "gap",
      statement: "A readout route opens for the device secret Alan's phone presents.",
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
    "Jenny's tile reaches Alan's route on a relay secret and his own reaches it on a device secret, and only the relay secret opens anything today, so her tile is the nearer of the two to working.",
    "The readout page type, the scale and what the tile counts are all in akasha, so the stack starts at the readout itself.",
    "The reading is taken on a workstation because a pod cannot write the page store, and the endpoint that would let one is work of its own rather than this initiative's.",
    "What a readout shows when nothing is left is carried by the readout, so it arrived with the page type rather than as an intent of its own.",
    "The ring is drawn by one file both tiles share, so it moves once and serves both.",
    "Route access refuses every caller until person enrolment is rebuilt on `supabase-auth-user-id`, so the device secret half of the guard stayed out of akasha rather than being carried in broken.",
    "The route cannot move before the credential, the readers it uses and the reading itself, and its generated `+types` import cannot move at all until the web app does.",
    "Every tool that builds a widget copies one flat directory of shared Swift, and akasha gives each component a folder of its own, so building an app from akasha changes how the copy is made rather than where it points.",
    "Deploys are broken today, so the intents naming a site or an app being put up are about that rather than about anything being written.",
  ],
} as const satisfies Initiative
