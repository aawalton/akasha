import type { Initiative } from "../initiative.page-type.types.ts"

export const dallaDeployCleanup = {
  id: "01a08cd4-2398-7e2b-8600-bc6002b41fe7",
  pageTypeSlug: "initiative",
  type: "initiative",
  slug: "dalla-deploy-cleanup",
  domain: "domain/infrastructure",
  persona: "dalla",
  intents: [
    {
      statement: "Every cluster service has deployed through `akasha deploy`.",
      workingMemory:
        "52 cluster service pages. Run on 2026-09-10: 36 now run exactly as their pages describe, 5 are web apps whose deploy would build and roll them out, and 11 refuse because a checksum or an image is a value nothing filled in, which is the finding `the-akasha-deploy-path-places-no-secret`. Applying git-transport's page found two faults, both mended: a hook stub written through a stale symlink, and `kubectl diff` asked in `default` rather than in the workload's namespace.\n",
    },
    {
      statement: "Every ios app has deployed through `akasha deploy`.",
      workingMemory:
        "Three ios apps: alanwalton, smilingjenny, atlas. Three roads reach a phone. `akasha deploy <slug>` cuts to TestFlight off the mac. `ios-app` builds there too, reaching the mac by `AKASHA_MAC_HOST` defaulting to the alias `macbook`, where the harness hardcodes `walton@100.64.0.2`. `mobile-deploy-device` builds and installs to a plugged-in phone, and its page states the commit built is `origin/main` rather than the one this checkout is at, so it cannot install what you are on.\n",
    },
    {
      statement: "No competing akasha build or deploy command exists.",
      workingMemory:
        "`infrastructure-workload-apply` is deleted and `infrastructure service install` with it, both roads folded into the deploy. Left for a phone: `ios-app` and `mobile-deploy-device`, which build on the mac by two engines sharing no code and pick a commit three different ways. Left for an image: three shell scripts running buildctl by hand, and 7 built-image pages a dead generator writes for `cluster/bun-git` and `cluster/ci`, the two the cluster pulls.\n",
    },
  ],
  constraints: [
    "The one deploy is `akasha deploy` at the root, and Alan reconciles that with the initiative pulling root commands into namespaces.",
  ],
} as const satisfies Initiative
