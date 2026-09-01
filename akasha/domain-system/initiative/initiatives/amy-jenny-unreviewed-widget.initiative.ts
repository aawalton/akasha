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
        "Alan repaired the two timed services himself in a08342663a, so neither fails live; systemctl still reads failed from a run before that fix, which is stale rather than current. One importer of the deleted module survives at ops-cli/global/deploy/deploy.command.code.attachment.ts:39. 49 of the 50 page types the callers write are markdown under pages/, and the store answers for akasha alone, so a renderer is what this intent wants. `tools/lib/page-query-client.ts` still answers 132 rows.",
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
        "The widget is whole, not a stub: `ios-program/alanwalton-widget` names 21 components and builds ValuesWidgetExtension. It GETs /api/categorization with X-Device-Secret, and that route reads what the relay holds and refuses a reading past 45 minutes. The server half is proved locally, 30 checks. Two things block it, neither the credential: no reading exists at all, since the cookie 401s and the relay says `stands beside no reading`; and the pod runs 1124e0a, 177 behind, with no relay route.",
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
    "A package under akasha may depend on one standing outside it, and several already do, so an outside dependency is no reason to hold a move back.",
    "An akasha deploy names one thing, reads what it is made of from its page, refuses what is ambiguous, and does nothing already done.",
    "Deploys are broken today, so an intent naming a site or an app being put up is about that rather than about anything being written.",
    "Nothing waits on Alan: a question for him becomes a finding with the call taken in his absence, and the work carries on.",
    "No act on this initiative is out of reach, deploys to the cluster included; only permanently deleting the repository is refused.",
    "Work runs in parallel through subagents wherever it can, twenty at once at the most.",
    "A package moving into akasha is written in afresh, since no command carries a file in. It is renamed to empty the old folder rather than because its old name would stop resolving.",
  ],
} as const satisfies Initiative
