import type { Module } from "@akasha/code-system/module"

export const iosSigning = {
  id: "01a05cee-e560-71dd-8e89-cb8b5c1119d9",
  pageTypeSlug: "module",
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
      statement: "the macbook is assumed to carry a ruby with an OpenSSL binding already installed",
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
  ],
} as const satisfies Module
