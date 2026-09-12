import type { Command } from "akasha/commands/command.page-type.types.ts"

export const talosSecretGen = {
  id: "01a06810-1f0b-7a91-8242-2addd716919f",
  type: "command",
  slug: "talos-secret-gen",
  definition: "the command writing a Talos cluster's PKI bundle SOPS-encrypted",
  code: "ts",
  changeKind: "change-mechanical",
  taking: [
    { said: "--cluster <name>", takes: "the cluster to write for, `main` where none is said" },
    { said: "--force", takes: "write over a bundle already there, which is a deliberate rotation" },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "`talosctl` or `sops` missing from PATH is the machine's fault.",
    },
    {
      invariantKind: "departure",
      statement: "A cluster nothing names is `main`.",
    },
    {
      invariantKind: "departure",
      statement: "A bundle already there is written over only where `--force` says so.",
    },
    {
      invariantKind: "departure",
      statement: "The bundle sits beside the cluster's page rather than under the home.",
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
      statement: "Nothing here writes the bundle unencrypted where that bundle is kept.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here undoes a rotation.",
    },
  ],
} as const satisfies Command
