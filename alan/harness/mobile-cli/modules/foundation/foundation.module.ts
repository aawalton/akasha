import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const foundation = {
  id: "01a05cee-e560-7247-8f2f-0960f65d785d",
  type: "page-type/module",
  slug: "foundation",
  definition:
    "the shell fragments and App Store Connect identifiers shared by every generated mac build script",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "the native shells have no lockfile of their own",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An install for a native shell runs at the root of the tree above that shell.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A build on a checkout has the akasha manifest as that root.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A build on a delivered tree has a manifest written at that tree's root.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The step installing a native shell's packages installs bun first on a mac with none.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A script that never runs bun installs no bun.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "the macbook keychain password is read from the MACBOOK_KEYCHAIN_PASSWORD environment variable",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The keychain password reaches the mac through the ssh environment.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No generated script carries the keychain password in its own text.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The password is unset before any step of the build can inherit it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A password that did not arrive ends the run before the build lock is taken.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A ring credential is read from the NATIVE_SHELL_RING_CREDENTIAL variable.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "An app whose page names no ring-credential script is asked for no credential.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A ring credential an app bakes and nothing holds ends the run before a number is spent.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing forwards a ring credential to a build whose app bakes none.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "the App Store Connect key id and issuer id here name one fixed Apple developer account",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "An app stating no widget bundle id exports no widget name and no components.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The mac checkout is a plain export of one commit rather than a worktree.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A ref is resolved to a commit in the clone before the export is written.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The index the export is written through sits beside the export rather than in it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The export is stamped at its root with the commit it was written from.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The export carries no git, so the stamping seam is told that commit.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A container step running as root leaves root-owned files in the mac checkout.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Taking the mac checkout away is `rm -rf` of the export and that index.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A removal that refuses leaves the rest of the cleanup to run.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The script making an app's native sources is run by name rather than through a manifest.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The plugins a build compiles in are the packages the app's page reaches.",
    },
  ],
} as const satisfies Module
