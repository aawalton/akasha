import type { Module } from "../modules/module.page-type.ts"

export const testOverlay = {
  id: "01a081dc-ed7c-73ff-9f22-31e2a97f4710",
  pageTypeSlug: "module",
  type: "module",
  slug: "test-overlay",
  definition: "a change's bodies mounted over the checkout, so a run reads the tree it would make",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A run under this reads the checkout with the change's bodies over it.",
    },
    {
      invariantKind: "departure",
      statement: "A body the change has is read at the path the change files that body at.",
    },
    {
      invariantKind: "departure",
      statement: "A path the change takes away is not there inside.",
    },
    {
      invariantKind: "departure",
      statement: "A path the change has no body for is read off the checkout.",
    },
    {
      invariantKind: "departure",
      statement: "A link the change has is made at the path that link is filed at.",
    },
    {
      invariantKind: "departure",
      statement: "A link points where the change says rather than where anything here works out.",
    },
    {
      invariantKind: "departure",
      statement: "A link is read against the folder that link sits in, as any symlink is.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here says which links a change needs.",
    },
    {
      invariantKind: "departure",
      statement: "A run under this begins in the mounted tree rather than in the checkout.",
    },
    {
      invariantKind: "departure",
      statement:
        "What resolves a name reads the mounted tree, so a way in the change brings is found.",
    },
    {
      invariantKind: "departure",
      statement: "The mount is made inside a user namespace, so no privilege is asked for.",
    },
    {
      invariantKind: "departure",
      statement: "The mount goes when the run that made it ends.",
    },
    {
      invariantKind: "departure",
      statement: "A path reaching outside the checkout refuses the mount.",
    },
    {
      invariantKind: "departure",
      statement: "The folders a mount writes to sit under `/var/tmp` rather than `/tmp`.",
    },
    {
      invariantKind: "constraint",
      statement: "The folder overlay work goes in is made unreadable by the kernel that made it.",
    },
    {
      invariantKind: "departure",
      statement: "A sweep takes that folder away from inside a user namespace of its own.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes to the checkout.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here spawns a runner.",
    },
    {
      invariantKind: "departure",
      statement: "The run inside is root in that namespace, so no file mode refuses it.",
    },
  ],
} as const satisfies Module
