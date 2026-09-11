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
      statement:
        "A deploy happens only where every file its artifact is built from passed its checks at that commit.",
      workingMemory:
        '`checksAt(every, "deploy")` and `judgingBy(every, "deploy")` sit in checking.module.code.ts:266 and :337, and nothing calls either; `gate-building` builds the change gate alone. A check is handed `{ root, changed, before, after }` from change.module.code.ts, the shape a diff between two commits fills. `closureFor` in deploy-file-closure answers what a deploy is built from, and `commitRecordedIn` in deploy-commit-recording answers the commit it was last put up at.\n',
    },
  ],
  constraints: [
    "The checks a deploy runs are the checks stating `runs-on-deploy`.",
    "A deploy is judged over the files its artifact is built from, diffed between the last deploy's commit and this one.",
  ],
} as const satisfies Initiative
