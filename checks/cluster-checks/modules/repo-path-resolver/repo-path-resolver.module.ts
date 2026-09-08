import type { Module } from "@akasha/code/module"

export const repoPathResolver = {
  id: "01a08175-cd3b-7078-bfbb-36a1452dce69",
  pageTypeSlug: "module",
  slug: "repo-path-resolver",
  definition:
    "the file a path literal names, read as repo-rooted or as anchored at the home folder",
  code: "ts",
} as const satisfies Module
