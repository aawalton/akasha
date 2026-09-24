import type { Host } from "akasha/infrastructure/machine/host/host.page-type.types.ts"

export const macbook = {
  id: "01a06590-e94f-7756-9d6b-824b7b6c9549",
  type: "page-type/host",
  slug: "macbook",
  definition: "Alan's Apple laptop",
  title: "MacBook",
  address: "100.64.0.2",
  loginUser: "walton",
  keyPath: "~/.ssh/id_ed25519",
  home: "/Users/walton",
  condaScript: "/opt/homebrew/Caskroom/miniforge/base/etc/profile.d/conda.sh",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The workstation reaches this machine over ssh and runs programs here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A fault on this machine is the harness's to mend rather than Alan's.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "This machine belonging to Alan is no reason to hand Alan a fault found here.",
    },
  ],
} as const satisfies Host
