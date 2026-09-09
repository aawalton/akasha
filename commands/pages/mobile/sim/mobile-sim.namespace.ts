import type { Namespace } from "../../../namespaces/namespace.page-type.ts"

export const mobileSim = {
  id: "01a07bc2-afbe-7db2-96a8-ce71678480ac",
  pageTypeSlug: "namespace",
  slug: "mobile-sim",
  definition: "the iOS simulator and what is driven on it",
  parts: [
    "command/mobile-sim-boot",
    "command/mobile-sim-eval",
    "command/mobile-sim-long-press-drag",
    "command/mobile-sim-open-url",
    "command/mobile-sim-push-tap",
    "command/mobile-sim-screenshot",
    "command/mobile-sim-status",
    "command/mobile-sim-tap",
    "command/mobile-sim-teardown",
    "command/mobile-sim-type",
  ],
} as const satisfies Namespace
