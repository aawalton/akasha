import type { Module } from "../../code-system/module/module.page-type.ts"
import type { PageType } from "../../pages-system/page-type/page-type.page-type.ts"
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
  extendsSlug: "page-type/module",
  properties: [
    { pagePropertySlug: "runs-at", required: true, many: true, max: null },
    { pagePropertySlug: "over-tools", required: false, many: true, max: null },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A hook is handed what the harness sends at its event.",
    },
    {
      invariantKind: "departure",
      statement: "A hook at a tool call answers whether that call may run.",
    },
    {
      invariantKind: "departure",
      statement: "A hook names the tools it judges, and is handed no others.",
    },
    {
      invariantKind: "departure",
      statement: "A hook that judges a call changes nothing but its answer.",
    },
    {
      invariantKind: "absence",
      statement: "A call a hook let through is not a call it allowed.",
    },
  ],
  directives: [
    {
      directiveKind: "rule",
      name: "Alan Approves",
      act: "Add a hook to akasha only where Alan has approved that hook.",
      warrant:
        "A hook binds every agent on every tool call, and a wrong one costs more than what it guards.",
      aids: [
        "Approving the initiative is not approving a hook.",
        "A hook replacing an old one still needs approval.",
      ],
    },
  ],
} as const satisfies PageType
