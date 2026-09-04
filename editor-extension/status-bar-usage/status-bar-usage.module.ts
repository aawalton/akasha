import type { Module } from "@akasha/code-system/module"

export const statusBarUsage = {
  id: "01a0655b-ae42-784d-bd36-ba69482649b6",
  pageTypeSlug: "module",
  slug: "status-bar-usage",
  definition: "the session and weekly figures the fleet's usage command answers with",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The fleet is asked through a child process rather than read in the editor host.",
    },
    {
      invariantKind: "departure",
      statement: "An account's page body loads under a runtime the editor host does not carry.",
    },
    {
      invariantKind: "departure",
      statement: "A mean taken over no account is no figure rather than zero.",
    },
    {
      invariantKind: "departure",
      statement: "A fleet that cannot be read throws rather than answering no figure.",
    },
    {
      invariantKind: "departure",
      statement:
        "A fleet sitting idle and a checkout that will not answer are told apart by the throw.",
    },
    {
      invariantKind: "departure",
      statement: "An answer that is no JSON object names no figure.",
    },
    {
      invariantKind: "departure",
      statement: "A mean missing the count the mean was taken over is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A figure that is neither a number nor nothing is refused.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here says how a figure is drawn.",
    },
  ],
} as const satisfies Module
