import type { Command } from "@akasha/command-system/command"

export const talosSecretsGen = {
  id: "01a06810-1f0b-7a91-8242-2addd716919f",
  pageTypeSlug: "command",
  slug: "talos-secrets-gen",
  definition: "the command writing a Talos cluster's PKI bundle SOPS-encrypted",
  code: "ts",
  changeKindSlug: "change-mechanical",
  taking: [
    { said: "--cluster <name>", takes: "the cluster to write for, `main` where none is said" },
    { said: "--force", takes: "write over a bundle that stands, which is a deliberate rotation" },
  ],
  helpNotes: [
    "the bundle is written to `akasha/machines/clusters/pages/<cluster>.cluster.sops.yaml`, beside that cluster's page.",
    "this runs once per cluster, before the first apply, and every apply for that cluster reads what it wrote.",
    "a rotation invalidates every node's PKI, so each node must be applied and bootstrapped again and etcd state is lost.",
    "talosctl and sops must stand on PATH, and the bundle is written encrypted rather than ever standing in the clear here.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A cluster nothing names is `main`.",
    },
    {
      invariantKind: "departure",
      statement: "A bundle that stands is written over only where `--force` says so.",
    },
    {
      invariantKind: "departure",
      statement: "The bundle stands beside the cluster's page rather than under the home.",
    },
    {
      invariantKind: "departure",
      statement: "The bundle is generated into a temporary folder and encrypted from there.",
    },
    {
      invariantKind: "departure",
      statement: "The temporary folder is taken away however the run ends.",
    },
    {
      invariantKind: "departure",
      statement: "An empty bundle is operational rather than a bundle.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes the bundle unencrypted where it is kept.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here undoes a rotation.",
    },
  ],
} as const satisfies Command
