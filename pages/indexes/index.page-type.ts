import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const index = {
  id: "01a04ef3-160f-7849-949b-629de4915d07",
  type: "page-type",
  slug: "index",
  definition: "one question the pages can be asked, answered by reading one file",
  pluralSlug: "indexes",
  parts: [
    "boolean-property/index-tracked",
    "index/index-identity",
    "index/index-import",
    "index/index-listing",
    "index/index-relation",
    "index/index-rule",
    "index/index-shapes",
    "index/index-value",
    "module/beside-turning",
    "module/extension-carrying",
    "module/file-appending",
    "module/generated-properties",
    "module/index-answering",
    "module/index-building",
    "module/index-carrying",
    "module/index-entries",
    "module/index-filing",
    "module/index-keeping",
    "module/index-reading",
    "module/index-settling",
    "module/index-shape",
    "module/index-surface",
    "module/indexing",
    "module/package-reaching",
    "module/path-claiming",
    "module/path-naming",
    "module/property-carrying",
    "module/property-file",
    "module/property-shaping",
    "module/reaching",
    "module/tree-reading",
    "test-fixture/fixture-world",
    "text-property/index-name",
  ],
  extends: ["page-type/module"],
  properties: [
    { pageProperty: "text-property/index-name", required: true, many: false },
    { pageProperty: "code-file-property/test", required: true, many: false },
    { pageProperty: "boolean-property/index-tracked", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A question reached by a different key is the same index.",
    },
    {
      invariantKind: "departure",
      statement: "A question no index answers makes a new index.",
    },
    {
      invariantKind: "departure",
      statement: "An index is derived.",
    },
    {
      invariantKind: "departure",
      statement: "An index page names the answers filed.",
    },
    {
      invariantKind: "departure",
      statement: "The code beside the index page files that and nothing else.",
    },
    {
      invariantKind: "departure",
      statement: "An index states its test.",
    },
    {
      invariantKind: "departure",
      statement: "Every index is written as a change lands.",
    },
    {
      invariantKind: "gap",
      statement: "No index is ever built anew; every write lays a delta over what is there.",
    },
    {
      invariantKind: "departure",
      statement: "An index states whether git holds the answers that index files.",
    },
    {
      invariantKind: "departure",
      statement: "The index is written under `.indexes` at the root of the checkout reading it.",
    },
    {
      invariantKind: "departure",
      statement: "Git holds the answers of an index whose own page says so, and no others.",
    },
    {
      invariantKind: "departure",
      statement: "A change carries those answers among its own file changes.",
    },
    {
      invariantKind: "departure",
      statement: "The index can be written again from the pages alone.",
    },
    {
      invariantKind: "departure",
      statement: "An index file is named for the value that index file answers.",
    },
    {
      invariantKind: "departure",
      statement: "An index file's name closes with `.jsonl`.",
    },
    {
      invariantKind: "departure",
      statement: "The file carries one answer to a line.",
    },
    {
      invariantKind: "departure",
      statement: "An index's answers are filed under a folder named for that index.",
    },
    {
      invariantKind: "departure",
      statement: "That folder is read from the index's own page.",
    },
    {
      invariantKind: "departure",
      statement: "A question no answer covers is answered here rather than by the caller asking.",
    },
    {
      invariantKind: "departure",
      statement: "A caller outside spells no directory the index files under.",
    },
    {
      invariantKind: "absence",
      statement: "A value no page carries has no file.",
    },
    {
      invariantKind: "departure",
      statement: "A question the index answers is read from the index rather than from the pages.",
    },
    {
      invariantKind: "absence",
      statement: "A directory is divided into no buckets.",
    },
    {
      invariantKind: "departure",
      statement: "The index is written by akasha's own code and by nothing else.",
    },
    {
      invariantKind: "departure",
      statement: "A long-running process akasha spawns writes here as a command does.",
    },
    {
      invariantKind: "departure",
      statement: "A path in the index is relative to the repository root.",
    },
    {
      invariantKind: "stopgap",
      statement: "The index has every page.",
    },
    {
      invariantKind: "departure",
      statement: "The index has the pages rather than every file git tracks.",
    },
    {
      invariantKind: "gap",
      statement: "No page's entry is older than the files its properties have.",
    },
    {
      invariantKind: "departure",
      statement: "Nothing in the index differs from the pages.",
    },
    {
      invariantKind: "departure",
      statement:
        "An import edge is keyed by the path a specifier reaches rather than by the specifier.",
    },
    {
      invariantKind: "departure",
      statement:
        "A change moving what a specifier reaches refiles every importer of that specifier.",
    },
    {
      invariantKind: "gap",
      statement: "Only an importer of a file is refused.",
    },
    {
      invariantKind: "gap",
      statement: "Only a path that makes an edge refuses the importers of that path.",
    },
    {
      invariantKind: "gap",
      statement: "A fixture files a page into every index a reader reads that page from.",
    },
    {
      invariantKind: "gap",
      statement: "A fixture takes a page out of every index answering for that page.",
    },
    {
      invariantKind: "gap",
      statement: "A question and its answer cross this boundary.",
    },
    {
      invariantKind: "gap",
      statement: "The index crosses this boundary as a change leaves the index.",
    },
    {
      invariantKind: "gap",
      statement: "Nothing more crosses this boundary.",
    },
    {
      invariantKind: "departure",
      statement: "A question answered once over one reading is held rather than worked out again.",
    },
    {
      invariantKind: "departure",
      statement: "An index says whether it is whole, in a mark at the top of that index.",
    },
    {
      invariantKind: "departure",
      statement: "An index saying nothing is an index that is missing, however much sits under it.",
    },
    {
      invariantKind: "departure",
      statement: "A refresh part way through says nothing, so nobody reads it as an index.",
    },
    {
      invariantKind: "departure",
      statement:
        "A refresh takes away every path under the index that the pages do not imply, but for that mark.",
    },
    {
      invariantKind: "departure",
      statement: "A folder under the index that no index page names goes with the next refresh.",
    },
    {
      invariantKind: "departure",
      statement:
        "A pattern written under the index or under a cache is Alan's to approve before it is written.",
    },
  ],
  types: "ts",
} as const satisfies PageType
