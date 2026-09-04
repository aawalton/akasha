import type { Module } from "@akasha/code-system/module"

export const deviceTokenRegistration = {
  id: "01a05c96-89f5-741d-a9a3-65ffde3552f4",
  pageTypeSlug: "module",
  slug: "device-token-registration",
  definition:
    "the push token a device is reached at, kept against whoever holds it and read back to reach them",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A registration lands the token as a `device-token` page through the pages system service.",
    },
    {
      invariantKind: "departure",
      statement:
        "The person a token is kept against is read from the account the registration signs in under.",
    },
    {
      invariantKind: "departure",
      statement:
        "The app a token is kept against is the iOS app page carrying the bundle registered.",
    },
    {
      invariantKind: "departure",
      statement:
        "A registration for a token already kept replaces the page that token was kept on.",
    },
    {
      invariantKind: "departure",
      statement:
        "The tokens a push is addressed to are read back for the account the push is sent for.",
    },
    {
      invariantKind: "departure",
      statement:
        "A token whose app no page carries refuses the whole read rather than being left out.",
    },
    {
      invariantKind: "departure",
      statement: "A token Apple no longer reaches is removed at the path its page was read at.",
    },
    {
      invariantKind: "absence",
      statement: "No refusal carries the token a device presented.",
    },
    {
      invariantKind: "absence",
      statement: "The platform a registration states is not kept.",
    },
    {
      invariantKind: "departure",
      statement: "The app a token is kept under is an iOS app.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches Apple.",
    },
    {
      invariantKind: "gap",
      statement:
        "The markdown device token pages the notifier read before are kept and read by nothing.",
    },
  ],
} as const satisfies Module
