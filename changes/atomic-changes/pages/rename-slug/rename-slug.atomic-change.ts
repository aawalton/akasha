import type { AtomicChange } from "../../atomic-change.page-type.ts"

export const renameSlug = {
  id: "01a0737b-b0e1-72ca-9152-c56abe8398f5",
  pageTypeSlug: "atomic-change",
  slug: "rename-slug",
  definition: "one page's slug restated in its own body and in the data of every page naming it",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The slug the page carries now is read out of its own body rather than handed in.",
    },
    {
      invariantKind: "departure",
      statement: "Which pages name this page is asked of the index rather than walked for.",
    },
    {
      invariantKind: "departure",
      statement: "Those pages are asked for by the id, which a slug rename leaves alone.",
    },

    {
      invariantKind: "departure",
      statement: "A page of the same page type already carrying the new slug refuses the change.",
    },
    {
      invariantKind: "departure",
      statement: "A key names its property by the slug that key makes rather than by the key.",
    },
    {
      invariantKind: "departure",
      statement: "A name is written back in the form it was written in, bare or under a page type.",
    },
    {
      invariantKind: "departure",
      statement: "A name inside a list is written back where that name sits in the list.",
    },
    {
      invariantKind: "departure",
      statement: "A namer no name of this page changes is left out of the answer.",
    },
    {
      invariantKind: "departure",
      statement: "The bodies are answered rather than written, so the caller lands them as one.",
    },
    {
      invariantKind: "absence",
      statement: "No file moves and no export is renamed, those being the path and export renames.",
    },
    {
      invariantKind: "departure",
      statement: "A refactor change runs those two beside this one to rename a page whole.",
    },
    {
      invariantKind: "gap",
      statement: "A body spelling the old slug outside a relation value is left as that body is.",
    },
  ],
} as const satisfies AtomicChange
