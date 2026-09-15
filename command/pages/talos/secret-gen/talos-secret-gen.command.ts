import type { Command } from "akasha/command/command.page-type.types.ts"

export const talosSecretGen = {
  id: "01a06810-1f0b-7a91-8242-2addd716919f",
  type: "page-type/command",
  slug: "talos-secret-gen",
  definition: "the command writing a Talos cluster's PKI bundle SOPS-encrypted",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "`talosctl` or `sops` missing from PATH is the machine's fault.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A cluster nothing names is `main`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A bundle already there is written over only where `--force` says so.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The bundle sits beside the secret page carrying it rather than under the home.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The bundle is generated into a temporary folder and encrypted from there.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The temporary folder is taken away however the run ends.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An empty bundle is operational rather than a bundle.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every answer here is built by a function rather than written out as a value.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here writes the bundle unencrypted where that bundle is kept.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here undoes a rotation.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run that threw after the bundle was written over says it was written over.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run that threw names those writes in the order that run finished them.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A run that threw carries the kind of fault the throw names.",
    },
  ],
  name: "secret-gen",
  arguments: [{ argument: "argument/force" }, { argument: "argument/cluster" }],
} as const satisfies Command
