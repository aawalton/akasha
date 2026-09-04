import type { Module } from "@akasha/code-system/module"

export const forcedToolChoice = {
  id: "01a0643b-c942-7c90-8314-374492f9e097",
  pageTypeSlug: "module",
  slug: "forced-tool-choice",
  definition: "a tool choice upstream refuses to force",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A refusal is a 400 carrying the anthropic error envelope.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal names the error type `invalid_request_error`.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal's message begins `tool_choice forces tool use is not compatible`.",
    },
    {
      invariantKind: "departure",
      statement: "A status other than 400 is no refusal.",
    },
    {
      invariantKind: "departure",
      statement: "A body that will not parse as json is no refusal.",
    },
    {
      invariantKind: "departure",
      statement: "An invalid request carrying no message is no refusal.",
    },
    {
      invariantKind: "departure",
      statement: "A tool choice of `tool` is rewritten to `auto`.",
    },
    {
      invariantKind: "departure",
      statement: "A tool choice of `any` is rewritten to `auto`.",
    },
    {
      invariantKind: "departure",
      statement: "A tool choice already `auto` is rewritten nowhere.",
    },
    {
      invariantKind: "departure",
      statement: "A body naming no tool choice is rewritten nowhere.",
    },
    {
      invariantKind: "departure",
      statement: "A rewrite carries every key the body holds beside the tool choice.",
    },
    {
      invariantKind: "departure",
      statement: "A refusal on a body holding a forcing tool choice is answered with a retry.",
    },
    {
      invariantKind: "departure",
      statement: "A request that carried no body is answered with the response upstream sent.",
    },
    {
      invariantKind: "departure",
      statement: "A 400 that is no refusal is answered with the response upstream sent.",
    },
    {
      invariantKind: "departure",
      statement: "An answer left unchanged carries the body text upstream sent.",
    },
    {
      invariantKind: "departure",
      statement: "An answer left unchanged carries the status text upstream sent.",
    },
    {
      invariantKind: "departure",
      statement: "An answer left unchanged carries the headers upstream sent.",
    },
    {
      invariantKind: "departure",
      statement: "An answer on a trail of one account goes to the seam the caller handed in.",
    },
    {
      invariantKind: "departure",
      statement: "An answer on a longer trail names every account the request reached.",
    },
    {
      invariantKind: "departure",
      statement: "A retry is written about before that retry is answered.",
    },
    {
      invariantKind: "departure",
      statement: "The response body is read to text the once.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here sends a request.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here chooses an account.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here counts the rewrites a request has had.",
    },
    {
      invariantKind: "gap",
      statement: "A rewrite drops the tool a forced choice named.",
    },
    {
      invariantKind: "gap",
      statement:
        "`tools/lib/model-gateway/forced-tool-choice-rewrite.ts` reads 400 rather than the response's status.",
    },
    {
      invariantKind: "gap",
      statement: "A refusal is read off the message text rather than off a code upstream sends.",
    },
    {
      invariantKind: "gap",
      statement: "The line saying a rewrite happened goes to the console rather than to a seam.",
    },
  ],
} as const satisfies Module
