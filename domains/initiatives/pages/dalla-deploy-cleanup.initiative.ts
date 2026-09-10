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
        "52 cluster service pages, every one run through `akasha deploy`. 50 now run exactly as their pages describe. The two left, auth-proxy and calendar-sync, name an image nothing in the tree builds, which is the finding `three-images-the-cluster-pulls-are-built-by-nothing-here` and the same work as the rivals below. Every placeholder checksum is now the hash of the config emitted beside it or of the secret the cluster holds.\n",
    },
    {
      statement: "Every ios app has deployed through `akasha deploy`.",
      workingMemory:
        "Three ios apps. alanwalton, as build 212, and smilingjenny, as build 25, were archived, exported and uploaded to TestFlight through `akasha deploy` on 2026-09-10, so both have deployed. atlas has no native shell at all: its folder holds a package, a Capacitor config, a web entry and two scripts, and no Xcode project, and its page names no programs and no web directory. Whether atlas is meant to ship is the one thing left, and it is Alan's to answer.\n",
    },
    {
      statement: "No competing akasha build or deploy command exists.",
      workingMemory:
        "`infrastructure-workload-apply` is deleted and `infrastructure service install` with it, both folded into the deploy. Left for a phone: `akasha ios-app build`, which installs on a simulator, and `akasha mobile deploy device`, which installs to a phone plugged into the mac off `origin/main` rather than off what this checkout is at. Two engines sharing no code with the deploy's. Left for an image: three shell scripts running buildctl by hand, and 7 built-image pages a dead generator writes.\n",
    },
  ],
  constraints: [
    "The one deploy is `akasha deploy` at the root, and Alan reconciles that with the initiative pulling root commands into namespaces.",
  ],
} as const satisfies Initiative
