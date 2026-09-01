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
        "49 of the 50 page types the callers write are markdown under pages/, and the store answers for akasha alone, so no renderer moves this. But tools/lib/page-query-client.ts still works: askComposed answered 132 daily-tracking pages just now. 0e6b6d059d repointed 89 files off it onto akasha stubs, so writePage, patchPage and askNamed refuse and the stoplights throw. The call: an adapter puts the markdown callers back on the working client, each moving to akasha as its page type lands.",
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
      statement: "The reading is taken by a process running on a workstation rather than by a pod.",
      workingMemory:
        "The workstation half is done: `monarch-reading-service` stands under alan-harness, installed and enabled, a oneshot on `*:0/5` sourcing the secrets file and running the reading module's own `import.meta.main`. Two halves remain, both filed. The pod still takes its own reading at `api.categorization.ts:21-24`, which is the next intent. And no reading reaches a pod, because the store reads out of the commit and a reading is never committed. The cookie 401s, so nothing live is proved.",
    },
    {
      statement:
        "Alan's categorization route in akasha answers from the readout rather than from Monarch.",
    },
    {
      statement: "A readout route opens for the device secret Alan's phone presents.",
      workingMemory:
        "This side stands. `device-secret` is a page type in person-system, and `module/device-secret-standing` reads a presented secret to the account that minted it under `secretHash`; the kebab key answered zero rows and refused every caller before route access. Proved end to end over a fixture since taken away: nothing, a wrong secret and a malformed one each 401, a valid one opens. The `last-used-at` patch is gone. Only a session mints the first secret, so the rest is Alan's.",
    },
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
    "The reading is taken on a workstation because a reading is never committed, and the store writes only what it commits.",
    "The route cannot move before the credential and the readers it uses and the reading itself.",
    "An akasha deploy names one thing, reads what it is made of from its page, refuses what is ambiguous, and does nothing already done.",
    "Deploys are broken today, so an intent naming a site or an app being put up is about that rather than about anything being written.",
    "Nothing waits on Alan: a question for him becomes a finding with the call taken in his absence, and the work carries on.",
    "No act on this initiative is out of reach, deploys to the cluster included; only permanently deleting the repository is refused.",
    "Work runs in parallel through subagents wherever it can, twenty at once at the most.",
    "A package moving into akasha is written in afresh and renamed, since no command carries a file in and its old name stops resolving.",
  ],
} as const satisfies Initiative
