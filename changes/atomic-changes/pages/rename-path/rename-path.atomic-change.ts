import type { AtomicChange } from "../../atomic-change.page-type.ts"

export const renamePath = {
  id: "01a0734e-59a1-71c6-9f21-71b776c3a5b2",
  pageTypeSlug: "atomic-change",
  slug: "rename-path",
  definition: "one file's path changed, with every body importing it repointed",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Which bodies import the path is asked of the index rather than walked for.",
    },
    {
      invariantKind: "departure",
      statement: "An index that cannot answer refuses the change rather than narrowing its reach.",
    },
    {
      invariantKind: "departure",
      statement: "The body that moves has its own relative reaches rebased on where it lands.",
    },
    {
      invariantKind: "departure",
      statement: "The body that moves is answered under the path it lands at, changed or not.",
    },
    {
      invariantKind: "departure",
      statement: "An importer no edge changes is left out of the answer.",
    },
    {
      invariantKind: "departure",
      statement: "A body already at the path this would move to refuses the change.",
    },
    {
      invariantKind: "departure",
      statement: "The path taken away is answered beside the bodies, since no body says it.",
    },
    {
      invariantKind: "departure",
      statement: "Keeping a page's slug in step with its file name is the refactor's concern.",
    },
    {
      invariantKind: "gap",
      statement: "A body naming the path in a string rather than in an import is left as it is.",
    },
  ],
} as const satisfies AtomicChange
