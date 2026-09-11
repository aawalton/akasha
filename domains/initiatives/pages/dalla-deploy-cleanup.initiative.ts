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
      statement: "Every file an addon's manifest names is in akasha.",
      workingMemory:
        "LibHistoire names ten `.dds` files and TemperCrafting thirteen more, none of them in the checkout; the ports carried the Lua and left the art in the game folder. Both refuse `akasha deploy`, and LibHistoire is what stops `akasha deploy temper-web` from packing the bundle whole. The art is on this machine under the live AddOns folder, so nothing is lost; it only has to reach akasha.\n",
    },
    {
      statement: "A file of bytes reaches akasha through a change.",
      workingMemory:
        "Every mechanical change takes a `body` of text, so `add-file` cannot write a `.dds` or a `.png`. The binaries akasha already holds, the persona wallpapers among them, were committed some other way, and `module/git-byte-pathspecs` beside them is the trace of it. Carrying an addon's art in needs this first.\n",
    },
    {
      statement: "The three kinds of service are named alike and sit together.",
      workingMemory:
        "Alan: rename all three, and the page types at least belong in `infrastructure/services/{inference|workstation|cluster}`. Today `cluster-service` sits at `infrastructure/cluster/services`, `workstation-service` at `services/workstation-services` and `inference-service` at `services/inference-services`. What each is renamed to is unsettled and is Alan's to say; the folders he named are settled.\n",
    },
  ],
  constraints: [
    "The one deploy is `akasha deploy` at the root, and Alan reconciles that with the initiative pulling root commands into namespaces.",
  ],
} as const satisfies Initiative
