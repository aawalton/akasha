import type { GitHook } from "akasha/infrastructure/git-transport/git-hook/git-hook.page-type.types.ts"

export const preReceiveMainAppendOnly = {
  id: "01a06816-2f11-729c-b258-50cbded51bb9",
  type: "page-type/git-hook",
  slug: "pre-receive-main-append-only",
  definition: "a push to main refused unless main only goes forward",
  shell: "sh",
  sourced: false,
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "main may be created.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A restore pushes into an empty repository.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "main may only fast-forward.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "main is never deleted.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every other ref is unconstrained.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "This hook is the last point a rewind can be refused before the mirror copies that rewind.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No branch is named or numbered here.",
    },
  ],
} as const satisfies GitHook
