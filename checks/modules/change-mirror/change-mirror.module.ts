import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const changeMirror = {
  id: "01a080b1-5322-7000-ae97-da48e0382c61",
  pageTypeSlug: "module",
  type: "module",
  slug: "change-mirror",
  definition: "a folder with the bodies a change has, each at the path it is filed at",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A body the change has is written at the path the change files that body at.",
    },
    {
      invariantKind: "departure",
      statement: "A path the change takes away is written by nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A mirror has nothing beyond the bodies the change has.",
    },
    {
      invariantKind: "absence",
      statement: "No body reaches a mirror from the tree the mirror is made beside.",
    },
    {
      invariantKind: "departure",
      statement: "A tool reading a mirror follows no path out of the mirror by itself.",
    },
    {
      invariantKind: "departure",
      statement: "A mirror sits under `/var/tmp` rather than `/tmp`.",
    },
    {
      invariantKind: "departure",
      statement: "A mirror is swept by the caller that asked for the mirror.",
    },
    {
      invariantKind: "departure",
      statement: "A mirror that could not be made is swept and reaches no caller.",
    },
    {
      invariantKind: "departure",
      statement: "A body that would not be read names the path that body was handed in for.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here runs a tool over the bodies the mirror holds.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here links a path into the mirror.",
    },
    {
      invariantKind: "absence",
      statement: "Which paths a mirror is written over is settled by the caller that asked.",
    },
  ],
} as const satisfies Module
