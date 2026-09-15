import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const serviceLoading = {
  id: "01a09fef-e3b8-7987-8115-0f845edec368",
  type: "module",
  slug: "service-loading",
  definition: "the file a unit starts, which takes every akasha module from the pages service",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The loader is written beside the unit files rather than into the checkout.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The loader is one file a machine over, and the run it makes is named by a slug.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A unit reaches the loader through the home directory systemd spells for it.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Which services the loader runs is named here rather than on a service's page.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A service that puts a kind up runs out of the tree that kind's deploy pinned.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "A whole kind starting at once asks the pages service more than it can answer.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "The loader runs every workstation service.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every `akasha/` specifier a service imports is answered by the pages service.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "The loader imports nothing from akasha before its plugin is registered.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A module reached by a path rather than by an `akasha/` specifier is read off disk.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing a package holds is asked of the pages service.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The bodies a service needs are asked for in one call before anything is imported.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The paths that call names are the closure the deploy read at the commit it put up.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path that call did not carry is asked for on its own and counted.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path the pages service answers nothing for is named rather than handed on.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The loader states the root, since a body over the wire has no folder of its own.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A root the environment already states is left as it is.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A count above nothing is written where the run's own output is read.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "No commit is named, so the bodies are the ones the checkout holds now.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "Code from an older commit reads the index folder that commit spelled.",
    },
    {
      invariantKind: "invariant-kind/constraint",
      statement: "One index folder is on disk, and it is the one the current commit spells.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "A loader asks for the bodies of the commit its service was deployed at.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "A manifest whose service is gone is taken away.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A service that mends a broken pages service is started out of the pinned tree rather than here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A pages service that refuses the connection is told apart from one answering nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A pages service that does not answer is asked again, each wait longer than the last.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A loader the pages service never answers names that address and refuses the run.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "The window for asking again outlasts one try, so a try that timed out is asked again.",
    },
  ],
} as const satisfies Module
