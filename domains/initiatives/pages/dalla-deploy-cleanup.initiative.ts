import type { Initiative } from "../initiative.page-type.types.ts"

export const dallaDeployCleanup = {
  id: "01a08cd4-2398-7e2b-8600-bc6002b41fe7",
  pageTypeSlug: "initiative",
  type: "initiative",
  slug: "dalla-deploy-cleanup",
  domain: "namespace/infrastructure",
  persona: "dalla",
  intents: [
    {
      statement: "Every workstation service has deployed through `akasha infrastructure deploy`.",
      workingMemory:
        "A workstation service page is found by the page-type index rather than by folder, and half of them sit beside the code they run. `akasha infrastructure deploy` is the only road to one as of cd0e554, writing its systemd units through `module/service-putting-up`. `akasha infrastructure service` keeps start, stop, restart and a `sweep` that takes a unit no page accounts for away and writes none. A dry run over every one on 2026-09-10 refused none. Left: running it for real.\n",
    },
    {
      statement: "Every cluster service has deployed through `akasha infrastructure deploy`.",
      workingMemory:
        "52 cluster service pages, each naming a manifest whose code beside it emits the yaml. `akasha infrastructure deploy` reaches all 52 as of cede693: a slug no web app carries reads as a cluster service, and one a web app carries reads as the web app, whose deploy applies that service anyway. A dry run over headscale on 2026-09-10 reported the cluster already as its page describes. What is left is running it over the other 51.\n",
    },
    {
      statement: "Every ios app has deployed through `akasha infrastructure deploy`.",
      workingMemory:
        "Three ios apps: alanwalton, smilingjenny, atlas. Three roads reach a phone. `infrastructure deploy <slug>` cuts to TestFlight off the mac. `ios-app` builds there too, reaching the mac by `AKASHA_MAC_HOST` defaulting to the alias `macbook`, where the harness hardcodes `walton@100.64.0.2`. `mobile-deploy-device` builds and installs to a plugged-in phone, and its page states the commit built is `origin/main` rather than the one this checkout is at, so it cannot install what you are on.\n",
    },
    {
      statement: "No competing akasha build or deploy command exists.",
      workingMemory:
        "`infrastructure-workload-apply` is deleted and `infrastructure service install` with it, both roads folded into the deploy. Left for a phone: `ios-app` and `mobile-deploy-device`, which build on the mac by two engines sharing no code and pick a commit three different ways. Left for an image: three shell scripts running buildctl by hand, and 7 built-image pages a dead generator writes for `cluster/bun-git` and `cluster/ci`, the two the cluster pulls.\n",
    },
  ],
  constraints: [
    "The one deploy stays under the infrastructure namespace rather than becoming a command at the root.",
  ],
} as const satisfies Initiative
