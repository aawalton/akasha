import type { Initiative } from "../initiative.page-type.ts"

export const amyJennyUnreviewedWidget = {
  id: "01a05431-37d9-7a21-ad2f-423df6ef1ac1",
  pageTypeSlug: "initiative",
  slug: "amy-jenny-unreviewed-widget",
  domainSlug: "domain/alan-harness",
  personaSlug: "amy",
  parentSlug: "akasha-migration",
  intents: [
    {
      statement: "No file imports `@shared/pages-query`.",
      workingMemory:
        "The package is already gone; 111 files still import it, so none of them build. Heaviest: alanwalton/web 28, shared/pages-access 27, tools/lib 20, shared/status-bar-access 11. What replaces it is the page store: POST /ask taking pageTypeSlug, where, keys, sortBy, descending, limit and offset and answering rows; POST /write taking writer, message, puts and removes. A pod reaches it at page-store.page-store.svc.cluster.local on 8787, a workstation at 100.64.0.4:8787.",
    },
    {
      statement:
        "A package reaches another package by the name its manifest states rather than by a path.",
      workingMemory:
        "1299 imports inside akasha cross a package edge and every one of them now lands in a package. Sixteen packages stand: agents, checks, code, command, context, domain, file, graph, hook, indexes, pages, pages-service, person, persona, readout, seat, service, testing. None but the two ios apps are named in the root workspaces list, so a name would not resolve yet; add them there first, then rewrite the relative specifiers, then narrow each manifest to what is really reached.",
    },
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
    "Nothing waits on Alan: a question for him becomes a finding with the call taken in his absence, and the work carries on.",
    "No act on this initiative is out of reach, deploys to the cluster included; only permanently deleting the repository is refused.",
    "Work runs in parallel through subagents wherever it can, twenty at once at the most.",
  ],
} as const satisfies Initiative
