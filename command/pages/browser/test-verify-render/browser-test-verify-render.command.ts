import type { Command } from "akasha/command/command.page-type.types.ts"

export const browserTestVerifyRender = {
  id: "01a06862-06c8-7001-8a4c-2018f029da13",
  type: "page-type/command",
  slug: "browser-test-verify-render",
  definition:
    "the command telling a rendered page on a deployed site from a failure and from an empty shell",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A render nothing discriminating was asserted over is refused before the browser opens.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "`--expect-text` alone is a discriminating assertion.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A count selector with its count is a discriminating assertion.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "An attribute selector with its attribute and value is a discriminating assertion.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A localhost origin is refused rather than driven.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The verdict is read from the render observed rather than from the HTTP status alone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A settle that ran out turns a failure into an indeterminate.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A sign-in that ran out before the render was seen answers indeterminate.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A success answers 0.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A failure answers 1.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An indeterminate answers 3.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The browser is closed whether the verdict was reached or thrown.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here writes as the user this command signed in as.",
    },
  ],
  name: "test-verify-render",
  arguments: [
    { argument: "argument/json" },
    { argument: "argument/url", required: true },
    { argument: "argument/sign-in-path" },
    { argument: "argument/path", required: true },
    { argument: "argument/page-type", required: true },
    { argument: "argument/root-selector" },
    { argument: "argument/hydration-selector" },
    { argument: "argument/timeout-ms" },
    { argument: "argument/no-sign-in" },
    { argument: "argument/as-throwaway" },
    { argument: "argument/expect-text" },
    { argument: "argument/expect-title" },
    { argument: "argument/expect-count-selector" },
    { argument: "argument/expect-count" },
    { argument: "argument/expect-attr-selector" },
    { argument: "argument/expect-attr" },
    { argument: "argument/expect-attr-value" },
    { argument: "argument/expect-attr-mode" },
  ],
} as const satisfies Command
