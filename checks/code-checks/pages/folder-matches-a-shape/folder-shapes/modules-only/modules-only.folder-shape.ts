import type { FolderShape } from "akasha/checks/code-checks/pages/folder-matches-a-shape/folder-shapes/folder-shape.page-type.types.ts"

export const modulesOnly = {
  id: "01a05f26-edf0-76fc-b2f1-9351eb172aee",
  type: "folder-shape",
  slug: "modules-only",
  definition: "the shape of a folder with the module folders the page above it declares",
  code: "ts",
  test: "ts",
  enabled: true,
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The folder is named `modules` or `.server`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "React Router runs a file under `.server` on the server and never in a browser.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "No page claims that name.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Each module has a folder to itself.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A folder with any file of its own is refused.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every subfolder has a module.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every module in that folder is a part the page above declares.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A folder above holding no page is asked for no part.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "The files a module holds are judged where that module is judged.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A subfolder holding a second page is the folder of no module.",
    },
  ],
} as const satisfies FolderShape
