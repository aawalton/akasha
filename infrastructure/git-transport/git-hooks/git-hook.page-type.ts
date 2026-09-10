import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const gitHook = {
  id: "01a08b9f-d972-7ee0-8e22-db3bbd9747c8",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "git-hook",
  definition: "a shell script git runs under a name git fixes",
  pluralSlug: "git-hooks",
  extends: ["page-type/shell-script"],
  parts: [
    "git-hook/post-receive-mirror",
    "git-hook/pre-receive-change-branches",
    "git-hook/pre-receive-main-append-only",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A hook's slug opens with the name git runs that hook under.",
    },
    {
      invariantKind: "departure",
      statement: "The rest of that slug says what the hook does.",
    },
    {
      invariantKind: "departure",
      statement: "A repository reaches a hook where the hook sits rather than holding a copy.",
    },
  ],
  types: "ts",
} as const satisfies PageType
