import type { Module } from "@akasha/code-system/module"
import type { Test } from "@akasha/code-system/module/test"
import type { Held } from "@akasha/pages-system/page-file-name"
import type { PageType } from "@akasha/pages-system/page-type"

export type FolderShape = Module & {
  test: Test
}

export type Standing = {
  readonly folder: string
  readonly files: readonly string[]
  readonly deep: readonly string[]
  readonly pages: readonly Held[]
  readonly properties: readonly Held[]
  readonly strays: readonly Held[]
  readonly entered: (path: string) => boolean
  readonly extending: (pageTypeSlug: string, wanted: string) => boolean
}

export type Judging = (standing: Standing) => readonly string[]

export const folderShape = {
  id: "01a04e33-f280-701e-96a0-859a53ed8298",
  pageTypeSlug: "page-type",
  slug: "folder-shape",
  definition: "a shape a folder is allowed to have",
  pluralSlug: "folder-shapes",
  partSlugs: [
    "folder-shape/folders-only",
    "folder-shape/one-page-with-its-properties",
    "folder-shape/pages-of-one-type",
    "folder-shape/property-pages-only",
  ],
  extendsSlug: "page-type/module",
  loadedBySlug: "code-check/folder-matches-a-shape",
  properties: [{ pagePropertySlug: "test", required: true, many: false }],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A folder matching any shape is right.",
    },
    {
      invariantKind: "departure",
      statement: "A folder may match more than one shape.",
    },
    {
      invariantKind: "departure",
      statement: "A shape judges the files sitting in one folder.",
    },
    {
      invariantKind: "departure",
      statement: "Every subfolder is a folder of its own.",
    },
    {
      invariantKind: "departure",
      statement: "A page carrying files beside that page stands alone in a folder.",
    },
    {
      invariantKind: "departure",
      statement: "A page that is one file stands with others of its type.",
    },
    {
      invariantKind: "departure",
      statement: "A shape states its test.",
    },
    {
      invariantKind: "absence",
      statement: "A shape carries no status.",
    },
  ],
} as const satisfies PageType
