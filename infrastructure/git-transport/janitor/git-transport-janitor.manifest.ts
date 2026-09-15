import type { Manifest } from "akasha/infrastructure/cluster/k8s-type/manifest/manifest.page-type.types.ts"

export const gitTransportJanitor = {
  id: "01a07c78-54fc-794e-becc-d1343a783c8d",
  type: "page-type/manifest",
  slug: "git-transport-janitor",
  definition:
    "the cron job packing away what a push leaves in the repositories the transport serves",
  code: "ts",
  generatedDirectory: true,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The sweep reaches the repositories through the volume the server writes to.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The sweep runs on the node the repositories sit on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Debris younger than the stale window is left alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A push still writing keeps its own quarantine younger than the stale window.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every path taken away is named in the job's output.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every repository on the volume is repacked on the run that sweeps that volume.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A repack rolls the packs and the loose objects a push leaves into one pack.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A pack holding more than twice what every smaller pack holds together is left as it is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A repack drops no object.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A repository is repacked only where the free space covers what that repack writes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A repository left unrepacked is named in the job's output with the free space and what it needs.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No run of the job overlaps another run.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A repack packs on one thread, under a capped delta window and a capped delta cache.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The free space on the volume is read before each repack.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The sweep carries none of the labels the server is selected by, so no traffic reaches it.",
    },
  ],
} as const satisfies Manifest
