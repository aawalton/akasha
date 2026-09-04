import type { Module } from "@akasha/code-system/module"

export const foundation = {
  id: "01a05cee-e560-7247-8f2f-0960f65d785d",
  pageTypeSlug: "module",
  slug: "foundation",
  definition:
    "the shell fragments and App Store Connect identifiers shared by every generated mac build script",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "the native shells carry no lockfile of their own",
    },
    {
      invariantKind: "departure",
      statement:
        "a bun install inside a native shell directory installs the whole workspace from the checkout root",
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
  ],
} as const satisfies Module
