import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const foundation = {
  id: "01a05cee-e560-7247-8f2f-0960f65d785d",
  type: "module",
  slug: "foundation",
  definition:
    "the shell fragments and App Store Connect identifiers shared by every generated mac build script",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "the native shells have no lockfile of their own",
    },
    {
      invariantKind: "departure",
      statement: "An install for a native shell runs at the root of the tree above that shell.",
    },
    {
      invariantKind: "departure",
      statement: "A build on a checkout has the akasha manifest as that root.",
    },
    {
      invariantKind: "departure",
      statement: "A build on a delivered tree has a manifest written at that tree's root.",
    },
    {
      invariantKind: "departure",
      statement:
        "the script header installs bun through homebrew on a mac that does not already have bun",
    },
    {
      invariantKind: "constraint",
      statement:
        "the macbook keychain password is read from the MACBOOK_KEYCHAIN_PASSWORD environment variable",
    },
    {
      invariantKind: "departure",
      statement: "The keychain password reaches the mac through the ssh environment.",
    },
    {
      invariantKind: "absence",
      statement: "No generated script carries the keychain password in its own text.",
    },
    {
      invariantKind: "departure",
      statement: "The password is unset before any step of the build can inherit it.",
    },
    {
      invariantKind: "departure",
      statement: "A password that did not arrive ends the run before the build lock is taken.",
    },
    {
      invariantKind: "constraint",
      statement: "A ring credential is read from the NATIVE_SHELL_RING_CREDENTIAL variable.",
    },
    {
      invariantKind: "absence",
      statement: "An app whose page names no ring-credential script is asked for no credential.",
    },
    {
      invariantKind: "departure",
      statement:
        "A ring credential an app bakes and nothing holds ends the run before a number is spent.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing forwards a ring credential to a build whose app bakes none.",
    },
    {
      invariantKind: "constraint",
      statement:
        "the App Store Connect key id and issuer id here name one fixed Apple developer account",
    },
    {
      invariantKind: "absence",
      statement: "An app stating no widget bundle id exports no widget name and no components.",
    },
    {
      invariantKind: "constraint",
      statement:
        "A container step running as root leaves files `git worktree remove` cannot delete.",
    },
    {
      invariantKind: "departure",
      statement:
        "Taking the mac checkout away falls back to `rm -rf` where `git worktree remove --force` cannot.",
    },
    {
      invariantKind: "departure",
      statement:
        "The script making an app's native sources is run by name rather than through a manifest.",
    },
    {
      invariantKind: "departure",
      statement: "The plugins a build compiles in are the packages the app's page reaches.",
    },
  ],
} as const satisfies Module
