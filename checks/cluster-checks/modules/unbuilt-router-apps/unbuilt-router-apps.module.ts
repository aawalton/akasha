import type { Module } from "@akasha/code-system/module"

export const unbuiltRouterApps = {
  id: "01a06880-1000-7000-9000-000000000006",
  pageTypeSlug: "module",
  slug: "unbuilt-router-apps",
  definition: "a router app no app-build step builds",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "An app is built where a build step names the app's build root.",
    },
    {
      invariantKind: "departure",
      statement: "An app whose build root no step names is unbuilt.",
    },
    {
      invariantKind: "departure",
      statement:
        "The built roots are read from the same selection the build steps are composed from.",
    },
  ],
} as const satisfies Module
