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
        "Met, proved by running. `@shared/pages-query` presents the four akasha entry points and routes on `reaches(roots, pageType)`: a page type standing as files here is answered here, one standing in akasha goes to the store. 82 callers repointed. a08342663a and 44a48c1aeb are this seat's, not Alan's or another agent's. A renderer in the store was not what was wanted; one already stands at tools/lib/page-write.ts. Suite 3218 pass 0 fail, alanwalton/web builds.",
    },
    {
      statement: "`pages-core` stands in akasha.",
      workingMemory:
        "Surveyed, not moved. Inbound was scored 0 from relative edges alone; the true figure is 239 files reaching `@shared/pages-core` by name, over 16 manifests and 61 subpaths, all rewritten in one landing because the name cannot survive the move. Cost ~530 files: 138 module pages, 138 code files, 448 internal specifiers of which 380 are extensionless, 239 external files. No barrels; 2 of 106 sources hold a comment. Three findings filed. No safe partial: a module page needs its code beside it.",
    },
    { statement: "The packages reading and writing pages stand in akasha." },
    { statement: "The packages Alan's own work rests on stand in akasha." },
    {
      statement: "The design packages stand in akasha.",
      workingMemory:
        "Three landed under akasha/design: badges, forms and layout. design-tokens went into shared/ instead. Three are held rather than merely hard: primitives, patterns and system each carry `.ts` beside `.tsx`, and `manifest-names-what-is-reached` reads `.ts` but not `.tsx`, so a mixed package must name exactly what its `.ts` files reach and leave out what only its `.tsx` reach. design-layout had to omit four real dependencies. That knot and the two copies of @types/react want Alan.",
    },
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
        "The pod now runs 283599af2e and the relay route 401s for want of `READING_RELAY_SECRET` rather than 405, so the one thing left is the reading: `MONARCH_COOKIE` is dead, Monarch 401s, and only Alan at a browser can mint another. The tile is whole and both its defects are fixed: a cached reading carries the moment it was written and is let go at 45 minutes, and the yellow rung moved off zero so a cleared backlog draws grey rather than caution. No Swift was compiled: no toolchain stands here.",
    },
    { statement: "Jenny's categorization route is in akasha." },
    { statement: "The page describing Jenny's tile is in akasha." },
    {
      statement: "Jenny's site deploys from akasha.",
      workingMemory:
        "The relay intent is met and gone: it stands in akasha, and `monarch-relay-service` carries to both origins on two dash-led runs lines, neither stopping the other, proved by running. Her site holds and serves a carried reading as Alan's does, proved over real HTTP in 9 tests. Alan's pod is deployed at 283599af2e. Left here: READING_RELAY_SECRET into her sops, then her deploy, then the guardRingReadout bypass arm goes once she has stopped pulling.",
    },
    { statement: "Jenny's unreviewed transaction iOS widget works." },
  ],
  constraints: [
    "Every intent on Alan's side comes before Jenny's even though the end of the work is hers.",
    "The ring is drawn by one file both tiles share, so it moves once and serves both.",
    "The reading is taken on a workstation because a reading is never committed, and the store writes only what it commits.",
    "A package under akasha may depend on one standing outside it, and several already do, so an outside dependency is no reason to hold a move back.",
    "An akasha deploy names one thing, reads what it is made of from its page, refuses what is ambiguous, and does nothing already done.",
    "A deploy is gated on the tracked tree installing rather than the worktree, since a manifest stands on disk and not in git and passes every check run here.",
    "Nothing waits on Alan: a question for him becomes a finding with the call taken in his absence, and the work carries on.",
    "No act on this initiative is out of reach, deploys to the cluster included; only permanently deleting the repository is refused.",
    "Work runs in parallel through subagents wherever it can, twenty at once at the most.",
    "A package moving into akasha is written in afresh, since no command carries a file in. It is renamed to empty the old folder rather than because its old name would stop resolving.",
  ],
} as const satisfies Initiative
