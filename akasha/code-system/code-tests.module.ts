import type { Module } from "./module/module.page-type.ts"

export const codeTests = {
  id: "01a04eb6-9e5f-7000-9bb8-11bc82309d76",
  pageTypeSlug: "module",
  slug: "code-tests",
  definition: "running the tests standing under a path, and reading what the run said",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A run is answered whole: what it exited, what it printed, the summary read out of it, and the verdict that follows. Every caller reads one answer rather than repeating how it is read.",
    },
    {
      invariantKind: "departure",
      statement:
        "A run marks the child it spawns, so a test reaching for this can tell it already stands inside a run and stop rather than starting another.",
    },
    {
      invariantKind: "departure",
      statement:
        "A run printing no summary is a crash whatever it exited, and a run reaching fewer files than stand under what was named is short rather than a pass.",
    },
    {
      invariantKind: "departure",
      statement:
        "Colour is taken out before the summary is read, so what a painted run says and what a plain one says are the same.",
    },
    {
      invariantKind: "departure",
      statement:
        "The test standing beside a file is named by the same rule that names any file beside a page, so a code file and its page answer the same test.",
    },
    {
      invariantKind: "absence",
      statement:
        "Nothing here says which tests inside a file run. A run is named by path, and the runner chooses the rest.",
    },
    {
      invariantKind: "absence",
      statement:
        "How a run is reported is not answered here. What is printed, how much of it a caller may hold, and what a refusal says belong to whoever asked for the run.",
    },
  ],
} as const satisfies Module
