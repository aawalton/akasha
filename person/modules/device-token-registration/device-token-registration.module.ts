import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const deviceTokenRegistration = {
  id: "01a05c96-89f5-741d-a9a3-65ffde3552f4",
  type: "module",
  slug: "device-token-registration",
  definition:
    "the push token a device is reached at, kept against whoever has it and read back to reach them",
  code: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A registration lands the token as a `device-token` page through the pages system service.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The person a token is kept against is read from the account the registration signs in under.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The app a token is kept against is the iOS app page with the bundle registered.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A registration for a token already kept replaces the page that token was kept on.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The tokens a push is addressed to are read back for the account the push is sent for.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A token whose app no page has refuses the whole read rather than being left out.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A token Apple no longer reaches is removed at the path its page was read at.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No refusal has the token a device presented.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "The platform a registration states is not kept.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The values a registration writes are the properties the page type declares.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Which page type a page is and which slug it has are said beside its values.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The app a token is kept under is an iOS app.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A token names its person and its app by page type and slug.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The slug a token's page is named by is the person, the app and the token.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reaches Apple.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement:
        "The markdown device token pages the notifier read before are kept and read by nothing.",
    },
  ],
} as const satisfies Module
