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
        "The rewrite is landed as 0e6b6d059d: all 114 specifiers over 89 files now name @akasha/pages-query, which stands at akasha/pages-system/pages-query. What is left is inside that package. Its manifest states four exports and three resolve: the root carries the whole write API, answer-schema and fetcher stand, and ./ask names a store-page-asking folder that has never existed while askComposed sits in store-questioning. 59 of the 114 spell /ask, so that gap is the rest of this intent.",
    },
    {
      statement:
        "A package reaches another package by the name its manifest states rather than by a path.",
      workingMemory:
        "The workspaces half is done: eighteen packages stand in the root list, bun.lock registers them, node_modules/@akasha holds all eighteen, and each of the 1298 reaches past a package edge lands on a file its manifest exports. What blocks the rewrite is the import index: landingOf answers null for a bare specifier, so naming the reaches would file no edge and the required-reading gate would go quiet. See finding naming-a-reach-would-empty-the-import-index. Dry run: /var/tmp/name-the-reaches.ts.",
    },
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
    {
      statement: "An akasha command puts up the web app a page describes.",
      workingMemory:
        "Landed as `akasha deploy <web-app>` in command-system/command/deploy, over module/web-app-reading and module/workload-deploying. It reads the web app page, the cluster service page that names, and the code beside that page. It refuses two names, a slug no page carries, and a page naming two services. `kubectl diff` says whether each manifest already stands, so a second call applies nothing. It makes no build; none can be made. See no-web-app-in-the-repository-can-be-built.",
    },
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
