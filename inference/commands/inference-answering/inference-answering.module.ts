import type { Module } from "@akasha/code/module"

export const inferenceAnswering = {
  id: "01a0685e-fd50-756a-85ea-473b887d050f",
  pageTypeSlug: "module",
  type: "module",
  slug: "inference-answering",
  definition:
    "the words an inference command was called with, read, and the service those words reach",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A flag naming a value takes the word after that flag.",
    },
    {
      invariantKind: "departure",
      statement: "An alias is read as the flag that alias represents.",
    },
    {
      invariantKind: "departure",
      statement: "A flag that repeats has every value the call said for that flag.",
    },
    {
      invariantKind: "departure",
      statement: "A flag that does not repeat has the last value the call said for that flag.",
    },
    {
      invariantKind: "departure",
      statement:
        "A flag carrying prose is also reachable by a path under its own name and `-file`.",
    },
    {
      invariantKind: "departure",
      statement: "A path of `-` is standard input.",
    },
    {
      invariantKind: "departure",
      statement:
        "A flag said both as itself and by its path is refused rather than chosen between.",
    },
    {
      invariantKind: "departure",
      statement: "A flag no command names is refused rather than passed over.",
    },
    {
      invariantKind: "departure",
      statement: "Every word a caller got wrong is named rather than the first alone.",
    },
    {
      invariantKind: "departure",
      statement:
        "A service the registry does not declare is operational rather than the caller's mistake.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches a host or writes a file.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here prints.",
    },
  ],
} as const satisfies Module
