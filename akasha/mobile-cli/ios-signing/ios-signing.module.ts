import type { Module } from "@akasha/code-system/module"

export const iosSigning = {
  id: "01a05cee-e560-71dd-8e89-cb8b5c1119d9",
  pageTypeSlug: "module",
  slug: "ios-signing",
  definition:
    "how a mac build gets its App Store distribution certificate and provisioning profile",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "the provisioning profile is ensured by ruby embedded as a heredoc in the generated shell script rather than by a TypeScript client",
    },
    {
      invariantKind: "constraint",
      statement: "the macbook is assumed to carry a ruby with an OpenSSL binding already installed",
    },
    {
      invariantKind: "departure",
      statement:
        "every existing App Store profile for the bundle id is deleted and recreated whenever a capability was just enabled",
    },
    {
      invariantKind: "departure",
      statement:
        "the keychain search list is narrowed to the login keychain alone for the length of the build",
    },
    {
      invariantKind: "constraint",
      statement:
        "the App Store Connect .p8 private key is read from the mac's own home directory rather than from this code",
    },
  ],
} as const satisfies Module
