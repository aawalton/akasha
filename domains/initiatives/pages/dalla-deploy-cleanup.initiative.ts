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
        "52 workstation service pages, 28 under `services/workstation-services/pages/` and 24 filed beside the code they run, found by the page-type index rather than by folder. One road reaches them: `infrastructure-service install`, which writes systemd user units under `~/.local/state` and links them where systemd reads them. 37 are scheduled and take a timer beside the unit, and 15 run long. That command's page carries the gap that a service akasha carries is reached from the cluster.\n",
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
        "`infrastructure-workload-apply` is deleted, its road folded into the deploy, and the reading and applying it held sit in `module/workload-applying`. Left: `infrastructure-service install` for a workstation service; `ios-app` and `mobile-deploy-device` for a phone; three shell scripts running buildctl by hand; and 7 built-image pages a dead generator writes for `cluster/bun-git` and `cluster/ci`, the two images the cluster pulls and nothing here builds.\n",
    },
  ],
  constraints: [
    "The one deploy stays under the infrastructure namespace rather than becoming a command at the root.",
  ],
} as const satisfies Initiative
