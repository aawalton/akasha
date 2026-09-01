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
      statement:
        "A file writing a page through the page store lands the write rather than refusing.",
      workingMemory:
        "The compare works: /write takes the commit read at, and a moved path is refused, proved over raw HTTP. But no renderer moves this. Of the 50 page types the callers write, 49 are markdown pages under pages/, and the store answers for akasha alone, on read and on write alike. The true blocker is that the store does not serve the markdown pages its callers write. The akasha service also took port 8787 from the one that did serve them, so /q now 404s; restoring that is in flight.",
    },
    {
      statement:
        "The packages under Alan's site that name no package of their own stand in akasha.",
    },
    { statement: "`pages-core` stands in akasha." },
    { statement: "The packages reading and writing pages stand in akasha." },
    { statement: "The packages Alan's own work rests on stand in akasha." },
    { statement: "The design packages stand in akasha." },
    { statement: "`pages-ui` stands in akasha." },
    { statement: "The source of Alan's site stands in akasha." },
    {
      statement: "An akasha command puts up the web app a page describes.",
      workingMemory:
        "Landed as `akasha deploy <web-app>` in command-system/command/deploy, over module/web-app-reading and module/workload-deploying. It reads the web app page, the cluster service page that names, and the code beside that page. It refuses two names, a slug no page carries, and a page naming two services. `kubectl diff` says whether each manifest already stands, so a second call applies nothing. It makes no build; none can be made. See no-web-app-in-the-repository-can-be-built.",
    },
    { statement: "Alan's site deploys from akasha." },
    {
      statement: "The reading is taken by a process running on a workstation rather than by a pod.",
      workingMemory:
        "The workstation half is done: `monarch-reading-service` stands under alan-harness, installed and enabled, a oneshot on `*:0/5` sourcing the secrets file and running the reading module's own `import.meta.main`. Two halves remain, both filed. The pod still takes its own reading at `api.categorization.ts:21-24`, which is the next intent. And no reading reaches a pod, because the store reads out of the commit and a reading is never committed. The cookie 401s, so nothing live is proved.",
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
