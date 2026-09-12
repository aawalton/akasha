import type { Command } from "akasha/commands/command.page-type.types.ts"

export const talosBootstrap = {
  id: "01a06809-a024-70e5-84a3-155889fe2c3e",
  type: "command",
  slug: "talos-bootstrap",
  definition: "the command starting etcd on one Talos control-plane node",
  code: "ts",
  changeKind: "change-mechanical",
  taking: [
    { said: "--ip <ip>", takes: "the address of the control-plane node etcd is started on" },
    {
      said: "--cluster <name>",
      takes: "the cluster whose talosconfig is read, `main` where none is said",
    },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A talosconfig that is not there refuses the bootstrap.",
    },
    {
      invariantKind: "departure",
      statement:
        "The talosconfig read sits at `<home>/.talos/<cluster>.config`, where `talos-apply` writes it.",
    },
    {
      invariantKind: "departure",
      statement: "talosctl writes its own progress to the streams the call was made on.",
    },
    {
      invariantKind: "departure",
      statement: "A cluster nothing names is `main`.",
    },
    {
      invariantKind: "departure",
      statement: "The node bootstrapped is the node the address names.",
    },
    {
      invariantKind: "departure",
      statement: "The node bootstrapped is its own endpoint.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here says whether the cluster was bootstrapped before.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here undoes a bootstrap.",
    },
  ],
} as const satisfies Command
