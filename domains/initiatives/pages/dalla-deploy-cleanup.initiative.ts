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
        "`infrastructure-workload-apply`, `infrastructure service install` and the three shell scripts running buildctl by hand are all deleted. A container recipe now names the repository its image is pushed to, `akasha deploy <recipe-slug>` builds and pushes it, and eso-rig, voice-infer and upscale-cu121 each went up that way. Left for a phone: `akasha ios-app build`, onto a simulator, and `akasha mobile deploy device`, onto a plugged-in phone off `origin/main` rather than off this checkout.",
    },
  ],
  constraints: [
    "The one deploy is `akasha deploy` at the root, and Alan reconciles that with the initiative pulling root commands into namespaces.",
  ],
} as const satisfies Initiative
