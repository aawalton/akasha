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
      statement: "Every ios app has deployed through `akasha deploy`.",
      workingMemory:
        "Three ios apps. alanwalton, as build 212, and smilingjenny, as build 25, were archived, exported and uploaded to TestFlight through `akasha deploy` on 2026-09-10, so both have deployed. atlas has no native shell at all: its folder holds a package, a Capacitor config, a web entry and two scripts, and no Xcode project, and its page names no programs and no web directory. Whether atlas is meant to ship is the one thing left, and it is Alan's to answer.\n",
    },
    {
      statement: "No competing akasha build or deploy command exists.",
      workingMemory:
        "Deleted so far: `infrastructure-workload-apply`, `infrastructure service install`, three buildctl shell scripts, `akasha ios-app build` and `akasha mobile deploy device`. Alan ruled the rest: inference services get a page type beside the cluster and workstation service and go up through the command; a temper addon deploys rather than building then installing, and the addon bundle build and publish join the tempereso.com web app deploy; talos is machine provisioning rather than a deploy.",
    },
  ],
  constraints: [
    "The one deploy is `akasha deploy` at the root, and Alan reconciles that with the initiative pulling root commands into namespaces.",
  ],
} as const satisfies Initiative
