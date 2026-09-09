import type { Module } from "@akasha/code/module"
import type { PageType } from "@akasha/pages/page-type"
import type { OverTools } from "./properties/over-tools.text-property.ts"
import type { RunsAt } from "./properties/runs-at.text-property.ts"

export type AgentHook = Module & {
  runsAt: RunsAt
  overTools?: OverTools
}

export const agentHook = {
  id: "01a04e0a-f8fa-7fb8-a730-0e27c83701be",
  pageTypeSlug: "page-type",
  slug: "agent-hook",
  definition: "a module the agent harness runs at the events it names",
  pluralSlug: "agent-hooks",
  partSlugs: [
    "agent-hook/block-akasha-shell-writes",
    "agent-hook/block-akasha-edits",
    "agent-hook/block-akasha-reads",
    "agent-hook/block-biome",
    "agent-hook/block-bun-test",
    "agent-hook/block-typecheck",
    "agent-hook/block-destructive-git",
    "agent-hook/block-git-writes",
    "agent-hook/block-subagent-audit",
    "agent-hook/clear-reads-on-context-replaced",
    "agent-hook/name-subagent",
    "agent-hook/state-compacting",
    "agent-hook/state-subagent",
    "page-type/inference-hook",
    "text-property/over-tools",
    "text-property/runs-at",
    "agent-hook/block-combined-akasha-calls",
  ],
  extends: ["page-type/module"],
  properties: [
    { pagePropertySlug: "text-property/runs-at", required: true, many: true, maxCount: null },
    { pagePropertySlug: "text-property/over-tools", required: false, many: true, maxCount: null },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A hook is handed the payload the harness sends at its event.",
    },
    {
      invariantKind: "departure",
      statement:
        "A hook at a tool call answers whether the call may run or hands back the input the call runs with.",
    },
    {
      invariantKind: "departure",
      statement: "A hook names the tools the hook judges.",
    },
    {
      invariantKind: "departure",
      statement: "A hook is handed no other calls.",
    },
    {
      invariantKind: "departure",
      statement: "A hook that judges a call changes nothing but its answer.",
    },
    {
      invariantKind: "absence",
      statement: "A call a hook let through is not a call the hook allowed.",
    },
    {
      invariantKind: "departure",
      statement: "A hook's registration is worked out from this page.",
    },
    {
      invariantKind: "departure",
      statement: "No file names a hook by hand.",
    },
    {
      invariantKind: "departure",
      statement:
        "A hook binds an agent from its next spawn after the page lands rather than mid-session.",
    },
    {
      invariantKind: "departure",
      statement: "A hook's code file answers to `ran`.",
    },
    {
      invariantKind: "departure",
      statement: "A hook's code file run as a program does the same as `ran`.",
    },
    {
      invariantKind: "departure",
      statement: "A registration names the path of a hook's code file.",
    },
    {
      invariantKind: "departure",
      statement: "The path a registration names is settled at the spawn rather than at the call.",
    },
    {
      invariantKind: "departure",
      statement: "A move that takes a hook's code file rewrites the live settings documents too.",
    },
    {
      invariantKind: "gap",
      statement:
        "A registration naming a file nothing is at refuses the call rather than passing that call.",
    },
  ],
  directives: [
    {
      directiveKind: "rule",
      name: "Alan Approves Hooks",
      act: "Add a hook to akasha only where Alan has approved that hook.",
      warrant: "A hook binds every agent at once, and a wrong one costs more than what it guards.",
      aids: [
        "Approving the initiative is not approving a hook.",
        "A hook replacing an old one still needs approval.",
        "How an approved hook reads needs none; what it refuses does.",
      ],
    },
  ],
} as const satisfies PageType
