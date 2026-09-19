import type { Held } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export type Declaring = {
  readonly slug: string
  readonly propertySlugs: ReadonlySet<string>
}

export type Wanted = { readonly name: string } | { readonly name: null; readonly gives: string }

export type Standing = {
  readonly folder: string
  readonly files: readonly string[]
  readonly pages: readonly Held[]
  readonly properties: readonly Held[]
  readonly strays: readonly Held[]
  readonly extending: (pageTypeSlug: string, wanted: string) => boolean
  readonly subfolders: readonly string[]
  readonly held: ReadonlySet<string>
  readonly under: (folder: string) => readonly string[]
  readonly declaring: (folder: string) => Declaring | null
  readonly naming: (folder: string) => Wanted | null
  readonly holds: (folder: string) => readonly string[]
  readonly pathsHeld: (folder: string) => readonly string[]
  readonly declared: (folder: string) => ReadonlySet<string>
  readonly gathered: (named: string) => readonly string[]
  readonly parts: (page: Held) => readonly string[]
  readonly partOf: (page: Held) => readonly string[]
  readonly addressing: (at: string) => readonly string[]
  readonly claimed: (folder: string) => boolean
}

export type Judging = (standing: Standing) => readonly string[]

export const folderShape = {
  id: "01a04e33-f280-701e-96a0-859a53ed8298",
  type: "page-type/page-type",
  slug: "folder-shape",
  definition: "a shape a folder is allowed to have",
  parts: [
    "boolean-property/folder-shape-enabled",
    "folder-shape/a-claimed-folder",
    "folder-shape/a-domain-with-its-parts",
    "folder-shape/a-page-type-with-its-parts",
    "folder-shape/a-page-with-its-parts",
    "folder-shape/collection-parts-under-their-plural",
    "folder-shape/kinds-under-their-plural",
    "folder-shape/modules-only",
    "folder-shape/pages-of-the-kind-named",
    "folder-shape/pages-of-the-type-above",
    "folder-shape/parts-under-the-page-they-name",
    "folder-shape/parts-under-their-plural",
    "folder-shape/sections-of-the-section-beside",
  ],
  extends: ["page-type/module"],
  loadedBy: "check-code/folder-matches-a-shape",
  properties: [
    { pageProperty: "code-file-property/test", required: true, many: false },
    { pageProperty: "boolean-property/folder-shape-enabled", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "One folder matches two shapes at once.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A shape reserves no term against a shape matching that same term.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No shape matches an empty folder.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A shape judges the files sitting in one folder.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every subfolder is a folder of its own.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A subfolder named as an enabled shape's own name is a part rather than a stray.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Those names are the ones the enabled shapes publish.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Such a subfolder is judged of its own by the shape whose name that subfolder takes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Passing such a subfolder over as a part loses no judgement.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A shape whose subject is a folder of one name reads no folder of another name.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "The files a part holds are judged where that part is judged.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A shape reads the folders sitting directly under the folder that shape judges.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A shape reads the files sitting directly in any folder the shape names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A shape reads the page type sitting alone in any folder the shape names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A folder with no page type answers with nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A folder with more than one page type answers with nothing too.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page type answers with its slug.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page type answers with every property slug that page type declares.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page type declares the properties written on its own page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page type declares the properties every type above that page type declares.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A page type declares the fields of every record property in that page type's `properties` folder.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A page type declares the members every `one-of-property` in its `properties` folder names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A folder with one page answers with the name that page gives its folder.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page gives its folder its slug.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "That name has the opening that name shares with the page above the folder taken off.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The opening is taken off again while the name left still opens with a name the page above has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The name a folder answers with opens with no name the page above that folder has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A folder answers with no name where taking that opening off leaves nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That answer is a folder wanting a name rather than a folder wanting no name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The folder with nothing above it answers with no name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A folder with no page answers with nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A folder with a page type beside a second page answers for the page type.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That second page is a domain of the page type's slug.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A folder holding more than one page otherwise answers with nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A folder answers with the page type and the slug of each page in that folder.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A folder answers with the path each of those pages was read from.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A folder answers with the parts the page in that folder declares.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A folder answers with the parts the second page in that folder declares too.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page answers with the files that page's own file properties land on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The files a page answers with are read off the page rather than worked out from its name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page answers with the build folders that page's own folder properties name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page answers with the collections that page names as holding that page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A page is read for its addresses by its path rather than by what names that page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page answers with every value on that page reading as a page's address.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A value reads as a page's address where that value is a page type slug and a slug.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page type gathers its pages under the plural that page type states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A folder answers with every page type gathering its pages under that name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A folder answers whether a page above that folder claims that folder.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A folder under a claimed folder answers that it is claimed too.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file held beside a page under a reserved tail is a part of that page too.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file whose ending a page's property names is a part of that page too.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A shape states its test.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A shape states whether the shape judges folders.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A shape judging no folder keeps its page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page is declared a part by its page type and slug together.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A folder holding a workspace beside a domain answers for the domain.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
