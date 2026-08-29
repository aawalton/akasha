import type { Module } from "../../code-system/module/module.page-type.ts"
import type { Test } from "../../code-system/module/properties/test.file-property.ts"
import type { PageType } from "../../pages-system/page-type/page-type.page-type.ts"
import type { RunsOnRead } from "./properties/runs-on-read.boolean-property.ts"
import type { RunsOnWrite } from "./properties/runs-on-write.boolean-property.ts"
import type { Transitive } from "./properties/transitive.boolean-property.ts"

export type ContextWarrant = Module & {
  test: Test
  runsOnRead: RunsOnRead
  runsOnWrite: RunsOnWrite
  transitive: Transitive
}

export const contextWarrant = {
  id: "01a04f56-55c4-7000-ba0d-c91b6e76b850",
  pageTypeSlug: "page-type",
  slug: "context-warrant",
  definition: "a module naming what a change to a file requires its writer to have read",
  partSlugs: [
    "boolean-property/runs-on-read",
    "boolean-property/runs-on-write",
    "boolean-property/transitive",
    "context-warrant/file-domain",
    "context-warrant/file-import",
    "context-warrant/file-property",
    "context-warrant/file-property-file",
  ],
  extendsSlug: "page-type/module",
  properties: [
    { pagePropertySlug: "test", required: true, many: false },
    { pagePropertySlug: "runs-on-read", required: true, many: false },
    { pagePropertySlug: "runs-on-write", required: true, many: false },
    { pagePropertySlug: "transitive", required: true, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A warrant is handed one path and answers with the readings that path owes.",
    },
    {
      invariantKind: "departure",
      statement:
        "A warrant states whether it runs on read, whether it runs on write, and whether it is transitive.",
    },
    {
      invariantKind: "departure",
      statement:
        "A warrant running on neither read nor write has landed and holds nobody, which is how a warrant states its rule before it binds anyone.",
    },
    {
      invariantKind: "departure",
      statement: "A warrant is not transitive unless it says so.",
    },
    {
      invariantKind: "departure",
      statement: "A warrant takes and gives paths under the root it was given.",
    },
    {
      invariantKind: "gap",
      statement: "Every warrant that runs is a page here, and no file names one by hand.",
    },
  ],
  directives: [
    {
      directiveKind: "rule",
      name: "Alan Approves",
      act: "Add a warrant to akasha only where Alan has approved that warrant.",
      warrant:
        "A warrant binds every writer on every change, and a wrong one stops work it should not.",
      aids: [
        "Approving the initiative is not approving a warrant.",
        "A warrant replacing an old one still needs approval.",
      ],
    },
  ],
} as const satisfies PageType
