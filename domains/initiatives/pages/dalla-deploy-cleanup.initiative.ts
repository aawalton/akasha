import type { Initiative } from "akasha/domains/initiatives/initiative.page-type.types.ts"

export const dallaDeployCleanup = {
  id: "01a08cd4-2398-7e2b-8600-bc6002b41fe7",
  type: "initiative",
  slug: "dalla-deploy-cleanup",
  domain: "domain/infrastructure",
  persona: "dalla",
  intents: [
    {
      statement: "A service waits out the cooldown its page states before deploying again.",
      workingMemory:
        "`number-property/cooldown-seconds` sits on `page-type/service`, and a page stating none takes the 60 seconds `deploy-choosing` holds as the default. Every deploy keeps `deployEndedAt` beside the page it was read from, and a deploy that refused keeps that same moment under `deployRefusedAt` too; the two being equal is what says the last deploy refused, and then the wait is 600 seconds rather than 60, so one thing that cannot go starves none of its kind. No page states a cooldown of its own yet.",
    },
    {
      statement:
        "A service deploys no commit newer than what every service it depends on has deployed.",
      workingMemory:
        "`relation-property/deploys-after` sits on `page-type/service`, and `deploy-choosing` holds back any service that still wants a deploy for one it names. That carries down a chain, since a service held back wants a deploy still, and it deadlocks on nothing, because the one holding another back is the one chosen first. A service naming one that is nowhere is held back by nothing. No page names one yet, so the rule bounds nothing today.",
    },
    {
      statement: "A deploy loop puts up first the service furthest behind that is able to deploy.",
      workingMemory:
        "`chosenFrom` in `deploy-choosing` sorts by when the commit each put up was made, oldest first, a service never put up ahead of every service that has been, and the slug settling a tie. It then asks down that order and stops at the first able one, so whether a service wants a deploy is asked only as far as the choosing needs. That, with one reading of the commit behind every closure of a kind, took a tick over 48 ESO addons from 17 seconds to under one.",
    },
    {
      statement: "One workstation service runs the deploy loops for every service of one kind.",
      workingMemory:
        "`workstation-deploying`, `eso-addon-deploying`, `cluster-deploying` and `web-app-deploying` each tick their own kind every minute through `ticked`, which needs only the kind named beside the page. A tick picks one subject and starts `akasha deploy --measured <slug>` in a transient scope named for that slug, bounded at an hour by systemd, then waits that deploy out. Three kinds have no loop: 13 inference services, 9 container recipes, and the 3 ios apps, which a deploy hands to Apple.",
    },
    {
      statement:
        "A service is deployed without anyone asking once a commit changes what it is built from.",
      workingMemory:
        "Built from is the closure `deploy-file-closure` follows out of the files beside a page, and changed is that closure meeting what `git diff` names between the `deployedCommit` kept beside the page and HEAD. A deploy is judged in an overlay carrying every file in a folder it is built from, read out of the commit being put up, so no run mixes two commits. All 48 ESO addons are up to date, the workstation kind is put up every few minutes, and the 46 cluster services are worked through one a tick.",
    },
  ],
  constraints: [
    "The checks a deploy runs are the checks stating `runs-on-deploy`.",
    "A deploy is judged over the files its artifact is built from, diffed between the last deploy's commit and this one.",
  ],
} as const satisfies Initiative
