import type { Namespace } from "akasha/command/namespace/namespace.page-type.types.ts"

export const mobileSim = {
  id: "01a07bc2-afbe-7db2-96a8-ce71678480ac",
  type: "page-type/namespace",
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
  name: "sim",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "One simulator session is open at a time.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A command driving the simulator attaches to the session already open rather than opening its own.",
    },
  ],
} as const satisfies Namespace
