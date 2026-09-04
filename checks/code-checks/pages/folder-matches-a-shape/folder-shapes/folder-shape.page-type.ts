import type { Module } from "@akasha/code-system/module"
import type { Test } from "@akasha/code-system/module/test"
import type { Held } from "@akasha/pages-system/page-file-name"
import type { PageType } from "@akasha/pages-system/page-type"
import type { FolderShapeEnabled } from "./properties/folder-shape-enabled.boolean-property.ts"

export type FolderShape = Module & {
  test: Test
  enabled: FolderShapeEnabled
}

export type Declaring = {
  readonly slug: string
  readonly pluralSlug: string | null
  readonly propertySlugs: ReadonlySet<string>
}

export type Standing = {
  readonly folder: string
  readonly files: readonly string[]
  readonly pages: readonly Held[]
  readonly properties: readonly Held[]
  readonly strays: readonly Held[]
  readonly entered: (path: string) => boolean
  readonly extending: (pageTypeSlug: string, wanted: string) => boolean
  readonly subfolders: readonly string[]
  readonly under: (folder: string) => readonly string[]
  readonly declaring: (folder: string) => Declaring | null
  readonly naming: (folder: string) => string | null
  readonly holds: (folder: string) => string | null
  readonly declared: (folder: string) => ReadonlySet<string>
  readonly parts: (page: Held) => readonly string[]
  readonly partOf: (page: Held) => readonly string[]
}

export type Judging = (standing: Standing) => readonly string[]

export const folderShape = {
  id: "01a04e33-f280-701e-96a0-859a53ed8298",
  pageTypeSlug: "page-type",
  slug: "folder-shape",
  definition: "a shape a folder is allowed to have",
  pluralSlug: "folder-shapes",
  partSlugs: [
    "boolean-property/folder-shape-enabled",
    "folder-shape/chapters-of-the-book-above",
    "folder-shape/folders-only",
    "folder-shape/modules-only",
    "folder-shape/one-page-with-its-properties",
    "folder-shape/a-page-with-its-parts",
    "folder-shape/a-domain-with-its-parts",
    "folder-shape/a-page-type-with-its-parts",
    "folder-shape/pages-of-one-type",
    "folder-shape/pages-of-the-type-above",
    "folder-shape/properties-of-the-type-above",
    "folder-shape/property-pages-only",
    "folder-shape/scripts-only",
    "folder-shape/single-entrance",
  ],
  extendsSlug: ["page-type/module"],
  loadedBySlug: "code-check/folder-matches-a-shape",
  properties: [
    { pagePropertySlug: "test", required: true, many: false },
    { pagePropertySlug: "folder-shape-enabled", required: true, many: false },
  ],
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
      statement: "A shape reserves no term against a shape matching that same term.",
    },
    {
      invariantKind: "gap",
      statement: "No shape matches an empty folder.",
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
      statement: "A shape reads the folders sitting directly under the folder that shape judges.",
    },
    {
      invariantKind: "departure",
      statement: "A shape reads the files sitting directly in any folder the shape names.",
    },
    {
      invariantKind: "departure",
      statement: "A shape reads the page type sitting alone in any folder the shape names.",
    },
    {
      invariantKind: "departure",
      statement: "A folder holding no page type answers with nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A folder holding more than one page type answers with nothing too.",
    },
    {
      invariantKind: "departure",
      statement: "A page type answers with its slug and its plural slug.",
    },
    {
      invariantKind: "departure",
      statement: "A page type answers with every property slug that page type declares.",
    },
    {
      invariantKind: "departure",
      statement: "A page type declares the properties written on its own page.",
    },
    {
      invariantKind: "departure",
      statement: "A page type declares what every type above that page type declares.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page type declares the fields of every record property in that page type's `properties` folder.",
    },
    {
      invariantKind: "departure",
      statement: "A folder holding one page answers with the name that page gives its folder.",
    },
    {
      invariantKind: "departure",
      statement: "A page gives its folder the plural slug that page states.",
    },
    {
      invariantKind: "departure",
      statement: "A page stating no plural slug gives its folder its slug.",
    },
    {
      invariantKind: "departure",
      statement: "A folder holding no page answers with nothing.",
    },
    {
      invariantKind: "departure",
      statement:
        "A folder holding a page type beside its workspace package answers for the page type.",
    },
    {
      invariantKind: "departure",
      statement: "That workspace package is slugged the page type's plural slug.",
    },
    {
      invariantKind: "departure",
      statement: "A folder holding more than one page otherwise answers with nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A folder answers with the page type and the slug of the one page in that folder.",
    },
    {
      invariantKind: "departure",
      statement: "A folder answers with the parts the page in that folder declares.",
    },
    {
      invariantKind: "departure",
      statement: "A folder answers with the parts that workspace package declares too.",
    },
    {
      invariantKind: "departure",
      statement: "A page answers with the files that page's own file properties land on.",
    },
    {
      invariantKind: "departure",
      statement: "Which files those are is read off the page rather than worked out from its name.",
    },
    {
      invariantKind: "departure",
      statement: "A page answers with the collections that page names as holding it.",
    },
    {
      invariantKind: "departure",
      statement: "A file held beside a page under a reserved tail is a part of that page too.",
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
      invariantKind: "departure",
      statement: "A shape states whether the shape judges folders.",
    },
    {
      invariantKind: "departure",
      statement: "A shape judging no folder keeps its page.",
    },
  ],
} as const satisfies PageType
