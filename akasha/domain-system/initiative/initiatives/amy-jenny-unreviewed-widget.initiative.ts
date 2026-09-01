import type { Initiative } from "../initiative.page-type.ts"

export const amyJennyUnreviewedWidget = {
  id: "01a05431-37d9-7a21-ad2f-423df6ef1ac1",
  pageTypeSlug: "initiative",
  slug: "amy-jenny-unreviewed-widget",
  domainSlug: "domain/alan-harness",
  personaSlug: "amy",
  parentSlug: "akasha-migration",
  intents: [
    { statement: "A unit is written from the page describing a service." },
    { statement: "A workstation service starts again when a file it reaches changes." },
    { statement: "An akasha command installs a workstation service." },
    { statement: "A page query is answered from an index rather than by reading every page file." },
    { statement: "A page query is answered while another is still being answered." },
    { statement: "A pod reaches the page store." },
    { statement: "A page is written over HTTP from a workstation." },
    { statement: "A running site states the commit it was built from." },
    { statement: "No file imports `@shared/pages-query`." },
    {
      statement:
        "A package reaches another package by the name its manifest states rather than by a path.",
    },
    { statement: "Every folder a package reaches is a package." },
    { statement: "No file Alan's site is built from is too long for akasha to hold." },
    {
      statement:
        "The packages under Alan's site that name no package of their own stand in akasha.",
    },
    { statement: "`pages-core` stands in akasha." },
    { statement: "The packages reading and writing pages stand in akasha." },
    { statement: "The packages Alan's own work rests on stand in akasha." },
    { statement: "A page type holds code written in TSX." },
    { statement: "A page type holds a stylesheet." },
    { statement: "The design packages stand in akasha." },
    { statement: "`pages-ui` stands in akasha." },
    { statement: "The source of Alan's site stands in akasha." },
    { statement: "A page describes one web app." },
    { statement: "A page describes the workload a cluster runs for a web app." },
    { statement: "An akasha command puts up the web app a page describes." },
    { statement: "Alan's site deploys from akasha." },
    {
      statement: "The reading is taken by a process running on a workstation rather than by a pod.",
    },
    {
      statement:
        "Alan's categorization route in akasha answers from the readout rather than from Monarch.",
    },
    { statement: "A readout route opens for the device secret Alan's phone presents." },
    { statement: "Alan's unreviewed transaction iOS widget works." },
    { statement: "The relay that carries Alan's reading to Jenny's site is in akasha." },
    { statement: "Jenny's categorization route is in akasha." },
    { statement: "The page describing Jenny's tile is in akasha." },
    { statement: "Jenny's site deploys from akasha." },
    { statement: "Jenny's unreviewed transaction iOS widget works." },
  ],
  constraints: [
    "Every intent on Alan's side comes before Jenny's even though the end of the work is hers.",
    "Route access refuses every caller until person enrolment is rebuilt on `supabase-auth-user-id`.",
    "The ring is drawn by one file both tiles share, so it moves once and serves both.",
    "The reading is taken on a workstation because a pod cannot write the page store.",
    "The route cannot move before the credential and the readers it uses and the reading itself.",
    "An akasha deploy names one thing, reads what it is made of from its page, refuses what is ambiguous, and does nothing already done.",
    "Deploys are broken today, so an intent naming a site or an app being put up is about that rather than about anything being written.",
  ],
} as const satisfies Initiative
