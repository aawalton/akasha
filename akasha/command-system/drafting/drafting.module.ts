import type { Module } from "@akasha/code-system/module"

export const drafting = {
  id: "01a06315-8aa2-7993-a0d0-9ec51066ecaf",
  pageTypeSlug: "module",
  slug: "drafting",
  definition: "the change an agent drafts into its patch rather than onto the tree",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A change drafted is folded into the patch the agent already holds.",
    },
    {
      invariantKind: "departure",
      statement: "The patch is rebased onto the commit at HEAD before a change is folded in.",
    },
    {
      invariantKind: "departure",
      statement: "A rebase says which paths moved between the patch's base and the commit at HEAD.",
    },
    {
      invariantKind: "departure",
      statement:
        "A path moved is a path whose body at HEAD is not the body the patch was built on.",
    },
    {
      invariantKind: "departure",
      statement: "A body that moved under a draft is merged rather than overwritten.",
    },
    {
      invariantKind: "departure",
      statement: "The body a change was composed against is what the merge reads as its base.",
    },
    {
      invariantKind: "departure",
      statement: "A change against a path the patch does not carry is drafted whole.",
    },
    {
      invariantKind: "departure",
      statement: "A change against a path the patch carries is merged onto the body drafted there.",
    },
    {
      invariantKind: "departure",
      statement: "A change leaving what HEAD holds takes nothing back out of the patch.",
    },
    {
      invariantKind: "departure",
      statement: "A conflict refuses the draft.",
    },
    {
      invariantKind: "departure",
      statement: "A draft refused leaves the patch unchanged.",
    },
    {
      invariantKind: "departure",
      statement: "A patch is read and written again under the turn the patch's file keeps.",
    },
    {
      invariantKind: "departure",
      statement: "A drafted body reaching what HEAD holds leaves the patch.",
    },
    {
      invariantKind: "departure",
      statement: "A patch left holding nothing is taken away.",
    },
    {
      invariantKind: "departure",
      statement: "The blobs a patch names are kept before the patch is written.",
    },
    {
      invariantKind: "departure",
      statement: "A ref keeping blobs is taken away with the patch that names those blobs.",
    },
    {
      invariantKind: "departure",
      statement: "A path that is no page is refused rather than drafted.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes into the worktree.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here commits.",
    },
    {
      invariantKind: "gap",
      statement: "A conflict is carried into the patch where the agent resolves the conflict.",
    },
  ],
} as const satisfies Module
