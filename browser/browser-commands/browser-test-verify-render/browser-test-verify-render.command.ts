import type { Command } from "@akasha/command-system/command"

export const browserTestVerifyRender = {
  id: "01a06862-06c8-7001-8a4c-2018f029da13",
  pageTypeSlug: "command",
  slug: "browser-test-verify-render",
  definition:
    "the command saying whether a page on a deployed site rendered, failed, or could not be told from an empty shell",
  code: "ts",
  changeKindSlug: "change-none",
  taking: [
    { said: "--url <origin>", takes: "the deployed origin the page is fetched from" },
    { said: "--path <path>", takes: "the path under that origin" },
    { said: "--page-type <slug>", takes: "the page type the answer is said about" },
    { said: "--expect-text <text>", takes: "text the rendered body is to hold" },
    { said: "--expect-title <text>", takes: "the title the document is to carry" },
    { said: "--expect-count-selector <sel>", takes: "the elements a count is taken over" },
    { said: "--expect-count <n>", takes: "how many of those elements are to stand" },
    { said: "--expect-attr-selector <sel>", takes: "the element an attribute is read off" },
    { said: "--expect-attr <name>", takes: "the attribute read off that element" },
    { said: "--expect-attr-value <text>", takes: "the value that attribute is to carry" },
    {
      said: "--expect-attr-mode <mode>",
      takes: "`equals` or `contains-token`, equals where none is said",
    },
    {
      said: "--root-selector <sel>",
      takes: "the element the render fills, `main` where none is said",
    },
    {
      said: "--hydration-selector <sel>",
      takes: "an element that stands once the page has hydrated",
    },
    {
      said: "--sign-in-path <path>",
      takes: "the path a sign-in wall sends to, `/sign-in` where none is said",
    },
    { said: "--timeout-ms <ms>", takes: "how long each wait is given" },
    { said: "--no-sign-in", takes: "look as nobody rather than signing in" },
    { said: "--as-throwaway", takes: "look as the throwaway user rather than the live one" },
    { said: "--json", takes: "give the verdict as JSON rather than as lines" },
  ],
  helpNotes: [
    "a run without a discriminating assertion is refused, since an empty render answers every question a blank page answers.",
    "a discriminating assertion is --expect-text, or a count selector with its count, or an attribute selector with its attribute and value.",
    "localhost is refused: a session cookie issued there is not sent to a deployed origin.",
    "the identity is Alan's live one unless --no-sign-in or --as-throwaway says otherwise, and it is only ever read.",
    "a wait that ran out turns what would have been a failure into an indeterminate.",
    "a sign-in that ran out before the render was seen is an indeterminate rather than a failure.",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A render nothing discriminating was asserted over is refused before the browser opens.",
    },
    {
      invariantKind: "departure",
      statement: "A localhost origin is refused rather than driven.",
    },
    {
      invariantKind: "departure",
      statement:
        "The verdict is read from what was observed rather than from the HTTP status alone.",
    },
    {
      invariantKind: "departure",
      statement: "A settle that ran out turns a failure into an indeterminate.",
    },
    {
      invariantKind: "departure",
      statement: "A sign-in that ran out before the render was seen answers indeterminate.",
    },
    {
      invariantKind: "departure",
      statement: "A pass answers 0, a failure 1, and an indeterminate 3.",
    },
    {
      invariantKind: "departure",
      statement: "The browser is closed whether the verdict was reached or thrown.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes as the user it signed in as.",
    },
  ],
} as const satisfies Command
