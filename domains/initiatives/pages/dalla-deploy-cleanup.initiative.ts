import type { Initiative } from "akasha/domains/initiatives/initiative.page-type.types.ts"

export const dallaDeployCleanup = {
  id: "01a08cd4-2398-7e2b-8600-bc6002b41fe7",
  pageTypeSlug: "initiative",
  type: "initiative",
  slug: "dalla-deploy-cleanup",
  domain: "domain/infrastructure",
  persona: "dalla",
  intents: [
    {
      statement: "A deploy happens at a specific commit, not at HEAD.",
      workingMemory:
        "`refNamed` in deploy.command.code.ts:52 refuses `--ref` for every kind but the ios app at :148, which takes `named ?? HEAD` and refuses a dirty worktree only where no ref is named. A web app builds HEAD in its pod through `headOf` in web-app-building:82 but reads its manifests from the checkout. The other five kinds read the checkout; only an image refuses drift, and only over the paths its recipe copies.\n",
    },
    {
      statement: "A deployed service tracks the most recent commit that was successfully deployed.",
      workingMemory:
        "Nothing records a deployed commit on a page. A web app stamps `.built-from` inside its pod and an image is tagged with a 12-character hash of `git ls-tree -r HEAD` over the paths its recipe copies. Neither reaches a page, and neither outlives the pod or the registry.\n",
    },
    {
      statement:
        "A deploy happens only where every file its artifact is built from passed its checks at that commit.",
      workingMemory:
        '`checksAt(every, "deploy")` and `judgingBy(every, "deploy")` sit in checking.module.code.ts:266 and :337, and nothing calls either; `gate-building` builds the change gate alone. One check states `runsOnDeploy`, and that check states every phase. A check is handed `{ root, changed, before, after }` from change.module.code.ts, which is the shape a diff between two commits fills.\n',
    },
  ],
  constraints: [
    "The checks a deploy runs are the checks stating `runs-on-deploy`.",
    "A deploy is judged over the files its artifact is built from, diffed between the last deploy's commit and this one.",
  ],
} as const satisfies Initiative
