import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const appBuilding = {
  id: "01a059b8-3354-76d3-b596-b5329132b15d",
  type: "module",
  slug: "app-building",
  definition: "what building one iOS app takes, read from that app's page",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The values a build needs are read from the app's page and the pages the app's page names.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The program stating a name of its own is the program shipped inside the app.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Two programs stating a name of their own is refused rather than one program being picked.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An app naming no build script is refused rather than walked to.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An app naming no sync script is refused rather than walked to.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The range each package an app reaches is installed at is read from the akasha manifest.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A package an app reaches that the akasha manifest states no range for is refused.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here reaches a machine.",
    },
  ],
} as const satisfies Module
