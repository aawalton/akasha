import type { Command } from "akasha/commands/command.page-type.types.ts"

export const talosSecretGen = {
  id: "01a06810-1f0b-7a91-8242-2addd716919f",
  type: "command",
  slug: "talos-secret-gen",
  definition: "the command writing a Talos cluster's PKI bundle SOPS-encrypted",
  code: "ts",
  test: "ts",
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
      invariantKind: "departure",
      statement: "Every answer here is built by a function rather than written out as a value.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes the bundle unencrypted where that bundle is kept.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here undoes a rotation.",
    },
    {
      invariantKind: "departure",
      statement: "A run that threw after the bundle was written over says it was written over.",
    },
    {
      invariantKind: "departure",
      statement: "A run that threw names those writes in the order that run finished them.",
    },
    {
      invariantKind: "departure",
      statement: "A run that threw carries the kind of fault the throw names.",
    },
  ],
  name: "secret-gen",
  arguments: [{ argument: "argument/force" }, { argument: "argument/cluster" }],
} as const satisfies Command
