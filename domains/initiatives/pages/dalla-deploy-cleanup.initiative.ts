import type { Initiative } from "../initiative.page-type.types.ts"

export const dallaDeployCleanup = {
  id: "01a08cd4-2398-7e2b-8600-bc6002b41fe7",
  pageTypeSlug: "initiative",
  type: "initiative",
  slug: "dalla-deploy-cleanup",
  domain: "namespace/infrastructure",
  persona: "dalla",
  intents: [
    { statement: "Every workstation service has deployed through `akasha infrastructure deploy`." },
    { statement: "Every cluster service has deployed through `akasha infrastructure deploy`." },
    {
      statement: "No competing akasha build or deploy command exists.",
      workingMemory:
        "Three roads under `namespace/infrastructure` reach the real. `infrastructure-deploy` reads one slug as a web app or an ios app, refusing a slug both carry. `infrastructure-workload-apply` was landed 2026-09-09 for a cluster service no web app names, headscale being neither, and builds nothing; six slugs sit on both a web app page and a cluster service page, which is why it took a second command. `infrastructure-service install` writes a workstation service's systemd units.\n",
    },
    {
      statement: "Every ios app has deployed through `akasha infrastructure deploy`.",
      workingMemory:
        "Three ios apps: alanwalton, smilingjenny, atlas. Three roads reach a phone. `infrastructure deploy <slug>` cuts to TestFlight off the mac. `ios-app` builds there too, reaching the mac by `AKASHA_MAC_HOST` defaulting to the alias `macbook`, where the harness hardcodes `walton@100.64.0.2`. `mobile-deploy-device` builds and installs to a plugged-in phone, and its page states the commit built is `origin/main` rather than the one this checkout is at, so it cannot install what you are on.\n",
    },
  ],
  constraints: [
    "The one deploy stays under the infrastructure namespace rather than becoming a command at the root.",
  ],
} as const satisfies Initiative
