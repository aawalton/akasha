import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const agentSettings = {
  id: "01a0657b-ad3f-7ce8-99f8-04da79375570",
  type: "page-type/page-type",
  slug: "agent-settings",
  definition: "a document declaring how the agent harness on this workstation is set up",
  parts: [
    "agent-settings/agents",
    "agent-settings/claude-config",
    "agent-settings/launch-flags",
    "agent-settings/mcp-servers",
    "agent-settings/remote-control",
    "agent-settings/tool-access",
    "file-property/harness-settings",
    "module-property-group/telling",
    "module/harness-settings-reading",
  ],
  extends: ["page-type/domain"],
  properties: [
    { pageProperty: "file-property/harness-settings", required: true, many: false },
    { pageProperty: "module-property-group/telling", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A settings document declares the settings a harness is told rather than deriving that.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The hook registrations are derived from the agent hook pages instead.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A derived document is merged over this document and written outside the repository.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A running seat watches the derived document rather than this page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A page here says the settings one program reads rather than the settings every program reads.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One path writes a seat's client configuration.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Which command launched a seat does not change the path writing that configuration.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
