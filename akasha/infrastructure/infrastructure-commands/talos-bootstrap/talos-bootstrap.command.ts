import type { Command } from "@akasha/command-system/command"

export const talosBootstrap = {
  id: "01a06809-a024-70e5-84a3-155889fe2c3e",
  pageTypeSlug: "command",
  slug: "talos-bootstrap",
  definition: "the command starting etcd on one Talos control-plane node",
  code: "ts",
  changeKindSlug: "change-mechanical",
  taking: [
    { said: "--ip <ip>", takes: "the address of the control-plane node etcd is started on" },
    {
      said: "--cluster <name>",
      takes: "the cluster whose talosconfig is read, `main` where none is said",
    },
  ],
  helpNotes: [
    "this runs once per cluster: again over a healthy cluster it does nothing, and over a broken one it can lose etcd state.",
    "the node must already carry its config, so `talos-apply` runs first and writes the talosconfig this reads.",
    "the talosconfig is read from `<home>/.talos/<cluster>.config`, where `talos-apply` wrote it.",
    "talosctl writes its own progress to the streams this was called on, so that output is not in the report.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A talosconfig that does not stand refuses the bootstrap.",
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
