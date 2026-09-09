import type { Module } from "@akasha/code/module"

export const flagArguing = {
  id: "01a08210-304b-74bd-95f9-7f1105af1da7",
  pageTypeSlug: "module",
  type: "module",
  slug: "flag-arguing",
  definition: "the value a flag has, read off the command line",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A flag ending in `-file` names a path its value is read from.",
    },
    {
      invariantKind: "departure",
      statement: "A flag ending in `-file` routes only where the flag it names has prose.",
    },
    {
      invariantKind: "departure",
      statement: "A path said as `-` is read from standard input.",
    },
    {
      invariantKind: "departure",
      statement: "A path that would not read is answered as why rather than thrown.",
    },
    {
      invariantKind: "departure",
      statement: "A whole number is digits alone.",
    },
    {
      invariantKind: "departure",
      statement: "A number too big to be exact is no whole number.",
    },
    {
      invariantKind: "departure",
      statement: "A path opening with `~/` is read against the home directory.",
    },
    {
      invariantKind: "departure",
      statement: "An absolute path is taken as that path is.",
    },
    {
      invariantKind: "departure",
      statement: "Any other path is read against the root the caller handed over.",
    },
    {
      invariantKind: "departure",
      statement: "A flag said twice is refused rather than taking the last value said.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here knows which flags an act takes.",
    },
  ],
} as const satisfies Module
