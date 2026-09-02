import type { Module } from "@akasha/code-system/module"

export const watcherUploadRetry = {
  id: "01a0633f-8d1e-708b-a8d1-f73b5552b672",
  pageTypeSlug: "module",
  slug: "watcher-upload-retry",
  definition: "how an upload the server broke off is tried again",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Only a statement timeout or a gateway failure is tried again.",
    },
    {
      invariantKind: "departure",
      statement: "Anything else thrown reaches the caller on the first attempt.",
    },
    {
      invariantKind: "departure",
      statement: "The ceiling on the delay doubles with each attempt.",
    },
    {
      invariantKind: "departure",
      statement: "The ceiling on the delay never rises above the longest delay allowed.",
    },
    {
      invariantKind: "departure",
      statement: "A delay is drawn at random from below its ceiling.",
    },
    {
      invariantKind: "departure",
      statement: "The final attempt throws rather than delaying again.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here says what is being uploaded.",
    },
  ],
} as const satisfies Module
