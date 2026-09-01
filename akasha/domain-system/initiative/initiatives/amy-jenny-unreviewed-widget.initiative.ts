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
      statement: "`pages-core` stands in akasha.",
      workingMemory:
        "Surveyed, not moved. Inbound was scored 0 from relative edges alone; the true figure is 239 files reaching `@shared/pages-core` by name, over 16 manifests and 61 subpaths, all rewritten in one landing because the name cannot survive the move. Cost ~530 files: 138 module pages, 138 code files, 448 internal specifiers of which 380 are extensionless, 239 external files. No barrels; 2 of 106 sources hold a comment. Three findings filed. No safe partial: a module page needs its code beside it.",
    },
    { statement: "The packages reading and writing pages stand in akasha." },
    { statement: "The packages Alan's own work rests on stand in akasha." },
    { statement: "The design packages stand in akasha." },
    { statement: "`pages-ui` stands in akasha." },
    { statement: "The source of Alan's site stands in akasha." },
    {
      statement:
        "The packages under Alan's site that name no package of their own stand in akasha.",
      workingMemory:
        "Eight of twelve folders are done: sms, readout-scale and tracking are gone, while device-secret, push and readout-credential keep only an adapter, and readout and person-access were already done. Typecheck errors under alanwalton/web fell from 151 to 115. The four left want a package no intent had stood up, so this now stands after the one that stands it up. Counts here must include the `~/*` alias: app/lib has 88 inbound that way rather than 0.",
    },
    {
      statement: "Alan's unreviewed transaction iOS widget works.",
      workingMemory:
        "The credential side is done and its intent gone: both of Alan's unrevoked device secrets stand as pages (0e557db688, b3d44bf124), deviceSecretCarryingHash answers `found` with revokedAt null for each, and guardReadout returns open. The live web pod 401s for nothing, for malformed and for an unowned secret. What is left is unknowable here: the plaintext lives only on the phone, and if the app was reinstalled a fresh mint is needed, which takes Alan's session.",
    },
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
