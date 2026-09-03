import type { ShellScript } from "@akasha/code-system/shell-script"

export const postReceiveMirror = {
  id: "01a06816-2f11-7d8b-bc04-3b874435b755",
  pageTypeSlug: "shell-script",
  slug: "post-receive-mirror",
  definition: "the repository copied out to the destination the repository declares",
  shell: "sh",
  sourced: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The destination is read from the repository the push landed in.",
    },
    {
      invariantKind: "departure",
      statement: "A repository declaring no destination fails rather than passing the copy over.",
    },
    {
      invariantKind: "departure",
      statement: "The copy runs after the push returns rather than while the client waits.",
    },
    {
      invariantKind: "departure",
      statement: "The runner leaves the process group, which the transport sweeps.",
    },
    {
      invariantKind: "departure",
      statement: "The runner holds no descriptor the client is waiting on.",
    },
    {
      invariantKind: "departure",
      statement: "One copy runs per repository at a time.",
    },
    {
      invariantKind: "departure",
      statement: "A push arriving while a copy runs leaves a mark the holder takes up.",
    },
    {
      invariantKind: "departure",
      statement: "A history copy pushes every branch and tag as they stand.",
    },
    {
      invariantKind: "departure",
      statement: "A snapshot copy pushes main's tree onto a lineage rooted at the destination.",
    },
    {
      invariantKind: "departure",
      statement: "A snapshot whose tree is unchanged is a copy that ran and pushed nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A push with no ceiling would outlive the reason for it, so it carries one.",
    },
    {
      invariantKind: "departure",
      statement: "What the run did is left beside the repository for anything to read.",
    },
  ],
} as const satisfies ShellScript
