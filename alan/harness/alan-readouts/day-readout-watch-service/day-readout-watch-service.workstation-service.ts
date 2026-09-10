import type { WorkstationService } from "akasha/services/workstation-services/workstation-service.page-type.types.ts"

export const dayReadoutWatchService = {
  id: "01a08c12-a327-7694-af88-2d20734ad347",
  pageTypeSlug: "workstation-service",
  type: "workstation-service",
  slug: "day-readout-watch-service",
  definition: "the service taking Alan's day readings again the moment his day changes",
  runs: ["bun alan/harness/alan-readouts/day-readout-watching/day-readout-watching.module.code.ts"],
  enabled: true,
  needsSecrets: true,
  systemd: {
    restart: "on-failure",
    restartDelaySeconds: 5,
    startLimitIntervalSeconds: 0,
  },
  invariants: [
    {
      invariantKind: "departure",
      statement: "The unit running the watch is simple rather than a timer.",
    },
    {
      invariantKind: "departure",
      statement: "Repeated starts are counted over no window.",
    },
    {
      invariantKind: "departure",
      statement: "A watch failing all night keeps on.",
    },
    {
      invariantKind: "departure",
      statement: "The sites the readings are carried to are named by the watch rather than here.",
    },
    {
      invariantKind: "constraint",
      statement: "The timers taking and carrying these readings run whatever this service does.",
    },
  ],
} as const satisfies WorkstationService
