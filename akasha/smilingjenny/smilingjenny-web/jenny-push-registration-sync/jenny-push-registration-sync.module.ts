import type { Module } from "@akasha/code-system/module"

export const jennyPushRegistrationSync = {
  id: "01a06558-c2cc-700c-a9ae-9d94adb263ca",
  pageTypeSlug: "module",
  slug: "jenny-push-registration-sync",
  definition: "the device token asked of the shell and handed on to what sends notifications",
  code: "tsx",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A permission refused once is not asked for again.",
    },
    {
      invariantKind: "departure",
      statement: "A browser outside the native shell registers nothing.",
    },
  ],
} as const satisfies Module
