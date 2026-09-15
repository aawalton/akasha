import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const gitHook = {
  id: "01a08b9f-d972-7ee0-8e22-db3bbd9747c8",
  type: "page-type/page-type",
  slug: "git-hook",
  definition: "a shell script git runs under a name git fixes",
  extends: ["page-type/shell-script"],
  parts: [
    "git-hook/post-receive-mirror",
    "git-hook/pre-receive-change-branches",
    "git-hook/pre-receive-main-append-only",
  ],
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A hook's slug opens with the name git runs that hook under.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The rest of that slug says which act the hook does.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A repository reaches a hook where the hook sits rather than holding a copy.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
