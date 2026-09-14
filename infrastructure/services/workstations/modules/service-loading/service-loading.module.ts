import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const serviceLoading = {
  id: "01a09fef-e3b8-7987-8115-0f845edec368",
  type: "module",
  slug: "service-loading",
  definition: "the file a unit starts, which takes every akasha module from the pages service",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The loader is written beside the unit files rather than into the checkout.",
    },
    {
      invariantKind: "departure",
      statement: "The loader is one file a machine over, and the run it makes is named by a slug.",
    },
    {
      invariantKind: "departure",
      statement: "A unit reaches the loader through the home directory systemd spells for it.",
    },
    {
      invariantKind: "departure",
      statement: "The loader runs every workstation service but those named here as staying back.",
    },
    {
      invariantKind: "departure",
      statement: "Which services stay back is named here rather than on a service's page.",
    },
    {
      invariantKind: "departure",
      statement: "A service that puts a kind up runs out of the tree that kind's deploy pinned.",
    },
    {
      invariantKind: "departure",
      statement: "Every `akasha/` specifier a service imports is answered by the pages service.",
    },
    {
      invariantKind: "absence",
      statement: "The loader imports nothing from akasha before its plugin is registered.",
    },
    {
      invariantKind: "departure",
      statement:
        "A module reached by a path rather than by an `akasha/` specifier is read off disk.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing a package holds is asked of the pages service.",
    },
    {
      invariantKind: "departure",
      statement:
        "The bodies a service needs are asked for in one call before anything is imported.",
    },
    {
      invariantKind: "departure",
      statement:
        "The paths that call names are the closure the deploy read at the commit it put up.",
    },
    {
      invariantKind: "departure",
      statement: "A path that call did not carry is asked for on its own and counted.",
    },
    {
      invariantKind: "departure",
      statement: "A count above nothing is written where the run's own output is read.",
    },
    {
      invariantKind: "departure",
      statement: "No commit is named, so the bodies are the ones the checkout holds now.",
    },
    {
      invariantKind: "constraint",
      statement: "Code from an older commit reads the index folder that commit spelled.",
    },
    {
      invariantKind: "constraint",
      statement: "One index folder is on disk, and it is the one the current commit spells.",
    },
    {
      invariantKind: "gap",
      statement: "A loader asks for the bodies of the commit its service was deployed at.",
    },
    {
      invariantKind: "gap",
      statement: "A manifest whose service is gone is taken away.",
    },
    {
      invariantKind: "departure",
      statement:
        "A service that mends a broken pages service is started out of the pinned tree rather than here.",
    },
    {
      invariantKind: "departure",
      statement:
        "A pages service that refuses the connection is told apart from one answering nothing.",
    },
    {
      invariantKind: "departure",
      statement:
        "A pages service that does not answer is asked again, each wait longer than the last.",
    },
    {
      invariantKind: "departure",
      statement: "A loader the pages service never answers names that address and refuses the run.",
    },
    {
      invariantKind: "departure",
      statement:
        "The window for asking again outlasts one try, so a try that timed out is asked again.",
    },
  ],
} as const satisfies Module
