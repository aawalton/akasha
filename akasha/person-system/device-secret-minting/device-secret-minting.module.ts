import type { Module } from "@akasha/code-system/module"

export const deviceSecretMinting = {
  id: "01a05b54-a906-71e9-a3de-4d27766113e0",
  pageTypeSlug: "module",
  slug: "device-secret-minting",
  definition: "whether a device mints a secret or keeps the one it holds",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement:
        "A keychain item outside the shared access group is unreadable by the widget extension.",
    },
    {
      invariantKind: "departure",
      statement: "A device holding its secret in the pinned domain mints none.",
    },
    {
      invariantKind: "departure",
      statement: "A device holding its secret only in the default domain mints one.",
    },
    {
      invariantKind: "departure",
      statement: "A device that did not say which domain holds its secret mints one.",
    },
    {
      invariantKind: "departure",
      statement: "A device that could not be asked mints one.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches the keychain or the route.",
    },
  ],
} as const satisfies Module
