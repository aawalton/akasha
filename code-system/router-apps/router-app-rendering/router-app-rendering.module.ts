import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const routerAppRendering = {
  id: "01a08e0c-9954-75c1-9e79-f74a78e53f01",
  pageTypeSlug: "module",
  type: "module",
  slug: "router-app-rendering",
  definition: "the response a router app's server entry renders for one request",
  code: "tsx",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A router app's server entry renders through here rather than rendering itself.",
    },
    {
      invariantKind: "departure",
      statement: "A server entry hands on what it was handed and states nothing of its own.",
    },
    {
      invariantKind: "departure",
      statement: "A stream is stopped a second past the ceiling the app states.",
    },
    {
      invariantKind: "departure",
      statement: "An error before the shell is written makes the response a five hundred.",
    },
    {
      invariantKind: "departure",
      statement: "An error after the shell is written is said to the console rather than answered.",
    },
    {
      invariantKind: "departure",
      statement: "A bot and a single-page app are answered only once the whole stream is ready.",
    },
    {
      invariantKind: "departure",
      statement: "How long a stream may take and what counts as a bot are the app's own.",
    },
    {
      invariantKind: "departure",
      statement: "A nonce that is not text is rendered as no nonce at all.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a load context, so no app's own context is named here.",
    },
  ],
} as const satisfies Module
