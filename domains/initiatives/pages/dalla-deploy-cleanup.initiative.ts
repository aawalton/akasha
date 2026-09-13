import type { Initiative } from "akasha/domains/initiatives/initiative.page-type.types.ts"

export const dallaDeployCleanup = {
  id: "01a08cd4-2398-7e2b-8600-bc6002b41fe7",
  type: "initiative",
  slug: "dalla-deploy-cleanup",
  domain: "domain/infrastructure",
  persona: "dalla",
  intents: [
    {
      statement: "One workstation service runs the deploy loops for every service of one kind.",
      workingMemory:
        "Every kind a deploy puts up has a loop of its own ticking every minute through `ticked`: the workstation, eso addon, cluster, web app, container recipe, inference and ios app kinds. A tick picks one subject and starts `akasha deploy --measured <slug>` in a transient scope named for that slug, bounded at an hour by systemd, then waits it out. A tick may hand a build to Apple without anyone asking, and each ios app waits an hour before the next.",
    },
    {
      statement:
        "A service is deployed without anyone asking once a commit changes what it is built from.",
      workingMemory:
        "Built from is the closure `deploy-file-closure` follows out of the files beside a page, and changed is that closure meeting what `git diff` names between the `deployedCommit` kept beside the page and HEAD. A deploy is judged in an overlay carrying every file in a folder it is built from, so no run mixes two commits. The 48 addons, 46 cluster services, 6 web apps, 3 recipes and 13 inference services are put up by a loop, each at least once.",
    },
  ],
  constraints: [
    "The checks a deploy runs are the checks stating `runs-on-deploy`.",
    "A deploy is judged over the files its artifact is built from, diffed between the last deploy's commit and this one.",
  ],
} as const satisfies Initiative
