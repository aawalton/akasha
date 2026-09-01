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
      statement: "The packages reading and writing pages stand in akasha.",
      workingMemory:
        "`@akasha/pages-access`, `pages-core`, `pages-url`, `pages-ui-store`, `pages-formula` and the store half of `pages-query` all stand, the first proven by 422 comparisons. Two remain, both deferred on purpose with findings: `shared/pages-query` is the local-first router above the akasha one and waits on `tools/lib`, `page/` and `repo/` being packaged; `shared/pages-system` was split, and 42 of its 52 files are reached by nothing and stay outside. `pages-ui` is its own intent.",
    },
    {
      statement: "The packages Alan's own work rests on stand in akasha.",
      workingMemory:
        "Seven folders left under `alanwalton/`. The Google five landed, and a sixth with them: three held one byte-identical parser, so `@akasha/google-oauth` holds it once. `imessage` is done, its carry proven by 273 comparisons with no difference. `mobile-cli` corrects an earlier note here saying nothing was blocked: it escapes its own src ten times into `tools/lib` and `repo/`, neither of which is a package, so it waits on those.",
    },
    {
      statement: "The design packages stand in akasha.",
      workingMemory:
        "design-primitives stands and 360 files reach it, but 36 inside akasha still reach `@shared`: badges 9, forms 10, layout 15, sms-opt-in 1. Its carry is faithful under akasha's own rules, so `undefined` at keyboard-registry:18 stays. design-system holds no `.ts` at all and would be refused all ten dependencies it names; design-patterns is held by a barrel re-exporting two siblings. 16 dependencies go unnamed across the three landed. The blindness has two halves and one widens safely, see finding.",
    },
    {
      statement: "`pages-ui` stands in akasha.",
      workingMemory:
        "`@akasha/pages-ui` stands with four modules and the old folder is down from 296 files to 291. It is one package rather than several: components and supabase are mutually dependent, and the 58 subpaths consumers reach cut across one core. The cost is not the module pages but what a file is rewritten to satisfy: 116 of 286 carry a `void` return, 360 in all, and every `.tsx` rendering a component by name meets the lower-camel rule. 98 files import nothing else inside it and go first.",
    },
    {
      statement:
        "The packages under Alan's site that name no package of their own stand in akasha.",
      workingMemory:
        "Eight of twelve folders are done: sms, readout-scale and tracking are gone, while device-secret, push and readout-credential keep only an adapter, and readout and person-access were already done. The package the four left were waiting on now stands as `@akasha/alanwalton-web`, holding chess and the declared-effects verb. Counts here must include the `~/*` alias: app/lib has 88 inbound that way rather than 0.",
    },
    {
      statement: "The interior of Alan's site stands in akasha.",
      workingMemory:
        "`lib`, `idle`, `awen`, `components`, `hooks` and `questions`, some 170 files as one landing. It stands after `pages-ui` at 96 reaches and `design-primitives` at 65, because landing it first means rewriting 161 specifiers twice. `.json` and `.css` are not the crux: `file-has-its-page` holds no extension list and they land as file properties, with five precedents including css, svg and json. Only 8 files of the 286 are awkward.",
    },
    {
      statement: "The routes of Alan's site stand in akasha.",
      workingMemory:
        "Last of the three, because `app/routes` is the only part of this move with modelling nobody has done. Nothing waits on it: the site is a leaf with no inbound importers. The shape is settled: a lane built the site through a symlinked package root and got exit 0 with asset hashes identical to the control, tailwind emitting 114,234 bytes. What breaks a move is depth rather than the symlink, and 3 of 15 escaping imports reach siblings.",
    },
    {
      statement: "Alan's unreviewed transaction iOS widget works.",
      workingMemory:
        "The pod runs 283599af2e and the pipe is whole on both sides: `READING_RELAY_SECRET` stands in Alan's sops and in Jenny's, and both relay routes answer 401 to an unauthenticated POST, checked by curl. What is left is the reading itself: `MONARCH_COOKIE` is dead, Monarch 401s, and only Alan at a browser can mint another. The tile is whole and both defects fixed: a cached reading carries when it was written and is let go at 45 minutes, and the yellow rung moved off zero. No Swift compiled here.",
    },
    {
      statement: "Jenny's site deploys from akasha.",
      workingMemory:
        "Deployed and proved live. READING_RELAY_SECRET stands in her sops at the workstation's value, moved by `sops edit` and checked by digest, never printed. Her pod runs b4289a8e7a: the relay route 401s without the secret and 400s with it on a body that is no reading, and her tile route answers 503 No reading in 0.23s, its build naming neither alanwalton.com nor SMILINGJENNY_RELAY_SECRET. The bypass arm is gone and Alan runs f25c8ffc, where that secret answers 401 rather than 503.",
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
