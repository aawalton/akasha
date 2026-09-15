import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const foundation = {
  id: "01a05cee-e560-7247-8f2f-0960f65d785d",
  type: "module",
  slug: "foundation",
  definition:
    "the shell fragments and App Store Connect identifiers shared by every generated mac build script",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "the native shells have no lockfile of their own",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An install for a native shell runs at the root of the tree above that shell.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A build on a checkout has the akasha manifest as that root.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A build on a delivered tree has a manifest written at that tree's root.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The step installing a native shell's packages installs bun first on a mac with none.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A script that never runs bun installs no bun.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement:
        "the macbook keychain password is read from the MACBOOK_KEYCHAIN_PASSWORD environment variable",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The keychain password reaches the mac through the ssh environment.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No generated script carries the keychain password in its own text.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The password is unset before any step of the build can inherit it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A password that did not arrive ends the run before the build lock is taken.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A ring credential is read from the NATIVE_SHELL_RING_CREDENTIAL variable.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "An app whose page names no ring-credential script is asked for no credential.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A ring credential an app bakes and nothing holds ends the run before a number is spent.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing forwards a ring credential to a build whose app bakes none.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement:
        "the App Store Connect key id and issuer id here name one fixed Apple developer account",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "An app stating no widget bundle id exports no widget name and no components.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement:
        "A container step running as root leaves files `git worktree remove` cannot delete.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Taking the mac checkout away falls back to `rm -rf` where `git worktree remove --force` cannot.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The script making an app's native sources is run by name rather than through a manifest.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The plugins a build compiles in are the packages the app's page reaches.",
    },
  ],
} as const satisfies Module
