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
        "Deleted: `infrastructure-workload-apply`, `infrastructure service install`, three buildctl scripts, `akasha ios-app build`, `akasha mobile deploy device`, `akasha inference-apply`, `akasha inference-plan`, `temper-addon-build`, `temper-addon-install`, `temper-addon-bundle-build` and `temper-addon-bundle-publish`. Left: `akasha deploy temper-web` refuses at LibHistoire, whose manifest names ten `.dds` files akasha does not hold, and no change lands bytes.",
    },
  ],
  constraints: [
    "The one deploy is `akasha deploy` at the root, and Alan reconciles that with the initiative pulling root commands into namespaces.",
  ],
} as const satisfies Initiative
