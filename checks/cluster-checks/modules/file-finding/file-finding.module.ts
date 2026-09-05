import type { Module } from "@akasha/code-system/module"

export const fileFinding = {
  id: "01a06829-124f-7835-8108-40ec195ea376",
  pageTypeSlug: "module",
  slug: "file-finding",
  definition: "the files under a folder matching a glob, with built and vendored folders left out",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A path is left out where any one of its segments is a folder left out.",
    },
    {
      invariantKind: "departure",
      statement: "A segment is matched whole rather than as a prefix of a longer name.",
    },
    {
      invariantKind: "departure",
      statement: "The folders left out are named here rather than read from the repository.",
    },
    {
      invariantKind: "departure",
      statement:
        "A caller naming its own folders to leave out replaces these folders rather than adds.",
    },
    {
      invariantKind: "departure",
      statement: "A file more than one pattern matches is answered once.",
    },
    {
      invariantKind: "departure",
      statement: "Files are answered in sorted order.",
    },
    {
      invariantKind: "departure",
      statement: "A dotfile is left out unless the caller asks for it.",
    },
    {
      invariantKind: "departure",
      statement: "A path is answered absolute unless the caller asks for it relative.",
    },
    {
      invariantKind: "departure",
      statement: "A folder is never answered, only a file.",
    },
  ],
} as const satisfies Module
