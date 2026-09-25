import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const targetKinding = {
  id: "01a08251-3c27-7aaa-b035-a2345ee394a0",
  type: "page-type/module",
  slug: "target-kinding",
  definition: "a path's change target subtype",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A path under a page name is taken as that page's own kind.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Whether a path is a page at all is answered here beside which kind that path is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A caller wanting only that answer takes it here rather than naming the kinds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The page types a name is read against are the ones the world files.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path under a `page-type` name is a page type before that path is a page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path under a page property name is a page property before that path is a page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every other TypeScript path is code.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every other path is a file and nothing narrower.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The kind answered is the slug of the change target subtype naming that path.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path taken as a page is a page property before that path is a page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page type taken as a page is a page and nothing narrower.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path taken as a page that names no page keeps the kind of file that path is.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here picks the change reached for a kind.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads the disk but the file kinds.",
    },
  ],
} as const satisfies Module
