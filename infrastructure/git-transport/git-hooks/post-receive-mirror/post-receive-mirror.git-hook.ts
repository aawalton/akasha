import type { GitHook } from "akasha/infrastructure/git-transport/git-hooks/git-hook.page-type.types.ts"

export const postReceiveMirror = {
  id: "01a06816-2f11-7d8b-bc04-3b874435b755",
  type: "git-hook",
  slug: "post-receive-mirror",
  definition: "the repository copied out to the destination the repository declares",
  shell: "sh",
  sourced: false,
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The destination is read from the repository the push landed in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A repository declaring no destination fails rather than passing the copy over.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The copy runs after the push returns rather than while the client waits.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The runner leaves the process group.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The transport sweeps that process group.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The runner has no descriptor the client is waiting on.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "One copy runs per repository at a time.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A push arriving while a copy runs leaves a mark the holder takes up.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A history copy pushes every branch and tag as those branches and tags are.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A snapshot copy pushes main's tree onto a lineage rooted at the destination.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A snapshot whose tree is unchanged is a copy that ran and pushed nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A push has a ceiling.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The outcome of the run is left beside the repository for anything to read.",
    },
  ],
} as const satisfies GitHook
