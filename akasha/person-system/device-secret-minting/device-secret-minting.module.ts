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
      statement: "A device holding its secret in the pinned domain mints no secret.",
    },
    {
      invariantKind: "departure",
      statement: "A device holding its secret only in the default domain mints one.",
    },
    {
      invariantKind: "departure",
      statement: "A device that did not say which domain holds its secret mints a secret.",
    },
    {
      invariantKind: "departure",
      statement: "A device that could not be asked mints a secret.",
    },
    {
      invariantKind: "constraint",
      statement: "The route answered here judges the credential alone.",
    },
    {
      invariantKind: "constraint",
      statement: "A store that did not answer is read as no answer rather than as a refusal.",
    },
    {
      invariantKind: "departure",
      statement: "A device the route refuses lets go of its secret.",
    },
    {
      invariantKind: "departure",
      statement: "A device that let go of its secret mints another secret.",
    },
    {
      invariantKind: "departure",
      statement: "A device the route admits keeps what that device holds.",
    },
    {
      invariantKind: "departure",
      statement: "A device the route left unanswered keeps what that device holds.",
    },
    {
      invariantKind: "departure",
      statement: "A device presenting nothing to the route is read as refused.",
    },
    {
      invariantKind: "constraint",
      statement: "A device recovers once in a day and no more often.",
    },
    {
      invariantKind: "departure",
      statement: "A recovery mark later than now is read as no mark.",
    },
    {
      invariantKind: "departure",
      statement: "The keychain is emptied before the mint rather than after the mint.",
    },
    {
      invariantKind: "constraint",
      statement: "The plaintext secret is never handed back out of the keychain.",
    },
    {
      invariantKind: "gap",
      statement: "How often a device recovered is written nowhere.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches the keychain or the route.",
    },
  ],
} as const satisfies Module
