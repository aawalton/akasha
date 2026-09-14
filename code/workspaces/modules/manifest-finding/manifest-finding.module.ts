import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const manifestFinding = {
  id: "01a0a04a-15a8-7799-bdf2-4db67b297cd0",
  type: "module",
  slug: "manifest-finding",
  definition: "which manifests are in the tree, and what each calls the package it names",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A package's folder is the folder its page sits in.",
    },
    {
      invariantKind: "departure",
      statement: "A page at the repository root has the root itself for its folder.",
    },
    {
      invariantKind: "departure",
      statement: "A page type the index files no page under is answered as no packages.",
    },
    {
      invariantKind: "departure",
      statement: "The name a manifest is held under is asked of the index.",
    },
    {
      invariantKind: "departure",
      statement: "An index naming no such file throws rather than answering no manifest.",
    },
    {
      invariantKind: "departure",
      statement: "Only a string target in the exports map names a way in.",
    },
    {
      invariantKind: "departure",
      statement: "A target is resolved against the package's folder.",
    },
    {
      invariantKind: "departure",
      statement: "A manifest naming no exports declares no interface.",
    },
    {
      invariantKind: "departure",
      statement: "A manifest that will not parse declares no interface.",
    },
    {
      invariantKind: "departure",
      statement: "A package whose manifest calls that package nothing is named by its folder.",
    },
    {
      invariantKind: "departure",
      statement: "Each part of a package name past the at sign is judged in `lower-kebab-case`.",
    },
    {
      invariantKind: "departure",
      statement: "A manifest naming no name names no package.",
    },
  ],
} as const satisfies Module
