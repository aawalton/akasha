import type { ShellScript } from "@akasha/code-system/shell-script"

export const preReceiveChangeBranches = {
  id: "01a06816-2f11-7f55-8c92-79bf5163f688",
  pageTypeSlug: "shell-script",
  slug: "pre-receive-change-branches",
  definition: "a push refused unless it names a change branch or moves main onto one",
  shell: "sh",
  sourced: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "A branch created is named for a change or a merge or a project, and a number.",
    },
    {
      invariantKind: "departure",
      statement: "The number is what tells a merge branch from the merge queue's own ref.",
    },
    {
      invariantKind: "departure",
      statement: "A branch already there is updated and deleted freely.",
    },
    {
      invariantKind: "departure",
      statement: "main is never created and never deleted here.",
    },
    {
      invariantKind: "departure",
      statement: "main only fast-forwards.",
    },
    {
      invariantKind: "departure",
      statement: "main only advances onto a commit an admitted branch already holds.",
    },
    {
      invariantKind: "departure",
      statement: "A branch pushed in the same transaction counts as holding it.",
    },
    {
      invariantKind: "departure",
      statement: "One ref refused refuses the whole push.",
    },
    {
      invariantKind: "absence",
      statement: "No push gets past this hook.",
    },
  ],
} as const satisfies ShellScript
