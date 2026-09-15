import type { GitHook } from "akasha/infrastructure/git-transport/git-hook/git-hook.page-type.types.ts"

export const preReceiveChangeBranches = {
  id: "01a06816-2f11-7f55-8c92-79bf5163f688",
  type: "page-type/git-hook",
  slug: "pre-receive-change-branches",
  definition: "a push refused unless it names a change branch or moves main onto one",
  shell: "sh",
  sourced: false,
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A branch created is named for a change or a merge or a project and for a number.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The number tells a merge branch from the merge queue's own ref.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A branch already there is updated and deleted freely.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "main is never created and never deleted here.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "main only fast-forwards.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "main only advances onto a commit an admitted branch already holds.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A branch pushed in the same transaction counts as holding that commit.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "One ref refused refuses the whole push.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No push gets past this hook.",
    },
  ],
} as const satisfies GitHook
