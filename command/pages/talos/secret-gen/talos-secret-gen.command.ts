import type { Command } from "akasha/command/command.page-type.types.ts"

export const talosSecretGen = {
  id: "01a06810-1f0b-7a91-8242-2addd716919f",
  type: "page-type/command",
  slug: "talos-secret-gen",
  definition: "the command writing a Talos cluster's PKI bundle SOPS-encrypted",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "`talosctl` or `sops` missing from PATH is the machine's fault.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A cluster nothing names is `main`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A bundle already there is written over only where `--force` says so.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The bundle sits beside the secret page carrying it rather than under the home.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The bundle is generated into a temporary folder and encrypted from there.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The temporary folder is taken away however the run ends.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An empty bundle is operational rather than a bundle.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every answer here is built by a function rather than written out as a value.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here writes the bundle unencrypted where that bundle is kept.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here undoes a rotation.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run that threw after the bundle was written over says it was written over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run that threw names those writes in the order that run finished them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run that threw carries the kind of fault the throw names.",
    },
  ],
  name: "secret-gen",
  arguments: [{ argument: "argument/force" }, { argument: "argument/cluster" }],
} as const satisfies Command
