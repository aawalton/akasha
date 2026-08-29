import type { Module } from "../../../../code-system/module/module.page-type.ts"
import type { Test } from "../../../../code-system/module/properties/test.page-property-type.ts"
import type { Held } from "../../../../pages-system/page/page-file-name.module.code.ts"
import type { PageType } from "../../../../pages-system/page-type/page-type.page-type.ts"

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
}

export type Judging = (standing: Standing) => readonly string[]

export const folderShape = {
  id: "01a04e33-f280-701e-96a0-859a53ed8298",
  pageTypeSlug: "page-type",
  slug: "folder-shape",
  definition: "a shape a folder is allowed to have",
  extendsSlug: "page-type/module",
  properties: [{ propertySlug: "page-property-type/test", required: true, many: false }],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A folder matching any shape is right, so a shape refusing a folder refuses nothing on its own.",
    },
    {
      invariantKind: "departure",
      statement:
        "A shape judges the files sitting in one folder, and every subfolder is a folder of its own.",
    },
    {
      invariantKind: "departure",
      statement:
        "A shape is handed the folder it judges and looks for nothing, so which folders are judged is the check's decision and never a shape's.",
    },
    {
      invariantKind: "departure",
      statement:
        "A shape states its test, because a shape judging every folder in the corpus is wrong quietly.",
    },
    {
      invariantKind: "absence",
      statement:
        "A shape carries no status. A shape that stands is a shape that judges, and one not ready to judge is not written.",
    },
  ],
} as const satisfies PageType
