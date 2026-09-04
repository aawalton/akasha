import type { WorkspacePackage } from "@akasha/code-system/workspace-package"

export const indexes = {
  id: "01a04a4a-23e9-7114-90a5-11acf49a937d",
  pageTypeSlug: "workspace-package",
  slug: "indexes",
  definition: "the indexes the pages are read through, each answering one question of them",
  manifest: "json",
  partSlugs: [
    "index/index-identity",
    "index/index-relation",
    "index/index-schema",
    "index/index-import",
    "index/index-path",
    "index/index-value",
    "page-type/index",
    "module/index-entries",
    "module/indexing",
    "module/index-reading",
    "module/index-surface",
    "module/index-stamp",
    "module/generated-properties",
    "module/reaching",
    "module/rebuilding",
    "module/index-shape",
    "module/package-reaching",
    "module/property-carrying",
    "module/index-answering",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The index is written under `.git/data`.",
    },
    {
      invariantKind: "departure",
      statement: "Git does not track `.git/data`.",
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
      statement: "A question the index answers is one file read rather than a walk.",
    },
    {
      invariantKind: "absence",
      statement: "A directory is divided into no buckets.",
    },
    {
      invariantKind: "departure",
      statement: "The index is written by the akasha commands and by nothing else.",
    },
    {
      invariantKind: "departure",
      statement: "A path in the index is relative to the repository root.",
    },
    {
      invariantKind: "departure",
      statement: "The index names the commit the index describes.",
    },
    {
      invariantKind: "stopgap",
      statement: "The index holds every page.",
    },
    {
      invariantKind: "gap",
      statement: "No page's entry is older than the files its properties hold.",
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
      statement: "Only what imports a file is refused when the index does not describe HEAD.",
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
  ],
} as const satisfies WorkspacePackage
