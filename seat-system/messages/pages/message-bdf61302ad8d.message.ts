import type { Message } from "akasha/seat-system/messages/message.page-type.types.ts"

export const messageBdf61302ad8d = {
  id: "01a09311-1272-7000-befe-bdf61302ad8d",
  type: "message",
  slug: "message-bdf61302ad8d",
  to: "thea",
  from: "audit-running",
  warrant: "announce",
  body: "the audit at a6eee53270bdff9ebf32af38c2e50d3cfd65ee33 found 2 checks newly refusing.\n`lint-clean` refused 1 time:\n  agents/agent.domain.ts — the linter could not read seat-system/subagents/pages/aranya-a617b07315fc6f948/aranya-a617b07315fc6f948.subagent.ts, seat-system/subagents/pages/athena-ac35e01dde2b83a2e/athena-ac35e01dde2b83a2e.subagent.ts. A linte... (66 characters more)\n`manifest-names-what-is-reached` refused 10 times:\n  package.json — names `@vscode/ripgrep` under `dependencies`, which nothing it holds reaches — a manifest names what its own package reaches and nothing besides\n  package.json — names `pg` under `dependencies`, which nothing it holds reaches — a manifest names what its own package reaches and nothing besides\n  package.json — names `@radix-ui/react-navigation-menu` under `dependencies`, which nothing it holds reaches — a manifest names what its own package reaches and nothing besides\n  package.json — names `@capacitor/app` under `dependencies`, which nothing it holds reaches — a manifest names what its own package reaches and nothing besides\n  package.json — names `@capacitor/filesystem` under `dependencies`, which nothing it holds reaches — a manifest names what its own package reaches and nothing besides\n/var/home/walton/.local/state/workstation-services/audit-verdicts.json holds what each of them refuses, whole.\n",
} as const satisfies Message
