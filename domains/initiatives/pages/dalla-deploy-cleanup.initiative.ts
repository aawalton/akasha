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
        "`relation-property/deploys-after` sits on `page-type/service`, and `deploy-choosing` holds back any service that still wants a deploy for one it names. That carries down a chain and deadlocks on nothing, since the one holding another back is the one chosen first. No page names one, and the looking came back empty: the ESO addons' `dependsOn` is a load order the floor check keeps true at every commit, and no cluster service breaks where another is put up first. The rule bounds nothing today.",
    },
    {
      statement: "A deploy loop puts up first the service furthest behind that is able to deploy.",
      workingMemory:
        "`chosenFrom` in `deploy-choosing` sorts by when the commit each put up was made, oldest first, a service never put up ahead of every service that has been, and the slug settling a tie. It then asks down that order and stops at the first able one, so whether a service wants a deploy is asked only as far as the choosing needs. That, with one reading of the commit behind every closure of a kind, took a tick over 48 ESO addons from 17 seconds to under one.",
    },
    {
      statement: "One workstation service runs the deploy loops for every service of one kind.",
      workingMemory:
        "Five services tick a kind of their own every minute through `ticked`: the workstation, eso addon, cluster, web app and container recipe kinds. A tick picks one subject and starts `akasha deploy --measured <slug>` in a transient scope named for that slug, bounded at an hour by systemd, then waits it out. Two kinds have no loop: the 13 inference services, whose deploy boots out a live model server on Alan's laptop with no idle check, and the 3 ios apps, which a deploy hands to Apple.",
    },
    {
      statement:
        "A service is deployed without anyone asking once a commit changes what it is built from.",
      workingMemory:
        "Built from is the closure `deploy-file-closure` follows out of the files beside a page, and changed is that closure meeting what `git diff` names between the `deployedCommit` kept beside the page and HEAD. A deploy is judged in an overlay carrying every file in a folder it is built from, so no run mixes two commits. The 48 ESO addons, the 46 cluster services and the 3 container recipes are up to date and their loops rest. The 6 web apps refuse at one test file over its ceiling.",
    },
  ],
  constraints: [
    "The checks a deploy runs are the checks stating `runs-on-deploy`.",
    "A deploy is judged over the files its artifact is built from, diffed between the last deploy's commit and this one.",
  ],
} as const satisfies Initiative
