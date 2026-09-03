import type { WorkspacePackage } from "@akasha/code-system/workspace-package"

export const mobileCommands = {
  id: "01a0685d-ceae-7000-bca6-75f9319e56ca",
  pageTypeSlug: "workspace-package",
  slug: "mobile-commands",
  definition: "what an agent runs by name over the ios apps and the simulator driving them",
  manifest: "json",
  partSlugs: [
    "command/mobile-cut-record",
    "command/mobile-cut-status",
    "command/mobile-deploy-device",
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
    "command/mobile-testflight-status",
    "module/mobile-answering",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A command here is named for the path the old ops command was reached by.",
    },
    {
      invariantKind: "departure",
      statement: "A command here says what it did and the work itself is done by mobile-cli.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches the mac except through mobile-cli.",
    },
    {
      invariantKind: "departure",
      statement:
        "One simulator session stands at a time, and a command driving it attaches to that session rather than opening its own.",
    },
    {
      invariantKind: "gap",
      statement: "The build a command here installs to a simulator is taken by `ios-app build`.",
    },
  ],
} as const satisfies WorkspacePackage
