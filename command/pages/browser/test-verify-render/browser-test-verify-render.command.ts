import type { Command } from "akasha/command/command.page-type.types.ts"

export const browserTestVerifyRender = {
  id: "01a06862-06c8-7001-8a4c-2018f029da13",
  type: "page-type/command",
  slug: "browser-test-verify-render",
  definition:
    "the command telling a rendered page on a deployed site from a failure and from an empty shell",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A render nothing discriminating was asserted over is refused before the browser opens.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "`--expect-text` alone is a discriminating assertion.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A count selector with its count is a discriminating assertion.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An attribute selector with its attribute and value is a discriminating assertion.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A localhost origin is refused rather than driven.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The verdict is read from the render observed rather than from the HTTP status alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A settle that ran out turns a failure into an indeterminate.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A success answers 0.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A failure answers 1.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An indeterminate answers 3.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The browser is closed whether the verdict was reached or thrown.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page the site sends a stranger away from is told from a page that failed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run opens the browser as nobody unless `--signed-in` says otherwise.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "`--signed-in` drives the render as the contributor Alan's person page names.",
    },
  ],
  name: "test-verify-render",
  arguments: [
    { argument: "argument/json" },
    { argument: "argument/url", required: true },
    { argument: "argument/sign-in-path" },
    { argument: "argument/signed-in" },
    { argument: "argument/path", required: true },
    { argument: "argument/page-type", required: true },
    { argument: "argument/root-selector" },
    { argument: "argument/hydration-selector" },
    { argument: "argument/timeout-ms" },
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
