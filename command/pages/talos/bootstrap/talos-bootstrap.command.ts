import type { Command } from "akasha/command/command.page-type.types.ts"

export const talosBootstrap = {
  id: "01a06809-a024-70e5-84a3-155889fe2c3e",
  type: "page-type/command",
  slug: "talos-bootstrap",
  definition: "the command starting etcd on a Talos control-plane node",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A talosconfig that is not there refuses the bootstrap.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The talosconfig read sits at `<home>/.talos/<cluster>.config`, where `akasha talos apply` writes it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "talosctl writes its own progress to the streams the call was made on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A cluster nothing names is `main`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The node bootstrapped is the node the address names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The node bootstrapped is its own endpoint.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here says whether the cluster was bootstrapped before.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every answer here is built by a function rather than written out as a value.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here undoes a bootstrap.",
    },
  ],
  name: "bootstrap",
  arguments: [{ argument: "argument/cluster" }, { argument: "argument/ip", required: true }],
} as const satisfies Command
