import type { Module } from "@akasha/code/module"

export const iosSigning = {
  id: "01a05cee-e560-71dd-8e89-cb8b5c1119d9",
  pageTypeSlug: "module",
  type: "module",
  slug: "ios-signing",
  definition:
    "how a mac build gets its App Store distribution certificate and provisioning profile",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The provisioning profile is ensured by ruby embedded in the generated shell script.",
    },
    {
      invariantKind: "constraint",
      statement: "the macbook is assumed to have a ruby with an OpenSSL binding already installed",
    },
    {
      invariantKind: "departure",
      statement:
        "every App Store profile for the bundle id is remade where a capability was just enabled",
    },
    {
      invariantKind: "departure",
      statement:
        "the keychain search list is narrowed to the login keychain alone for the length of the build",
    },
    {
      invariantKind: "constraint",
      statement: "the App Store Connect .p8 private key is read from the mac's own home directory",
    },
    {
      invariantKind: "departure",
      statement: "The mac is reached and mended over ssh from the workstation rather than by hand.",
    },
    {
      invariantKind: "departure",
      statement: "A signing failure on the mac is the harness's to mend rather than Alan's.",
    },
    {
      invariantKind: "departure",
      statement: "A profile call App Store Connect refuses is no fault of the mac's keychain.",
    },
    {
      invariantKind: "departure",
      statement: "A create App Store Connect answers with a 5xx is asked again three times.",
    },
    {
      invariantKind: "departure",
      statement: "A run failing after the delete leaves the bundle no profile until the next run.",
    },
  ],
} as const satisfies Module
