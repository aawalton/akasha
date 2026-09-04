import type { Domain } from "@akasha/domains/domain"
import type { PageType } from "@akasha/pages-system/page-type"
import type { HarnessSettings } from "./properties/harness-settings.file-property.ts"

export type AgentSettings = Domain & {
  harnessSettings: HarnessSettings
}

export const agentSettings = {
  id: "01a0657b-ad3f-7ce8-99f8-04da79375570",
  pageTypeSlug: "page-type",
  slug: "agent-settings",
  definition: "one document declaring how the agent harness on this workstation is set up",
  pluralSlug: "agent-settings-documents",
  partSlugs: [
    "agent-settings/agents",
    "agent-settings/claude-config",
    "agent-settings/launch-flags",
    "agent-settings/mcp-servers",
    "agent-settings/remote-control",
    "agent-settings/tool-access",
    "file-property/harness-settings",
  ],
  extendsSlug: ["page-type/domain"],
  properties: [{ pagePropertySlug: "harness-settings", required: true, many: false }],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A settings document declares what a harness is told rather than deriving that.",
    },
    {
      invariantKind: "departure",
      statement: "The hook registrations are derived from the agent hook pages instead.",
    },
    {
      invariantKind: "departure",
      statement: "A derived document is merged over this one and written outside the repository.",
    },
    {
      invariantKind: "departure",
      statement: "A running seat watches the derived document rather than this page.",
    },
    {
      invariantKind: "departure",
      statement: "A page here says what one program reads rather than what every program reads.",
    },
    {
      invariantKind: "departure",
      statement: "One path writes a seat's client configuration.",
    },
    {
      invariantKind: "departure",
      statement:
        "Which command launched a seat does not change the path writing that configuration.",
    },
    {
      invariantKind: "gap",
      statement: "Nothing inside akasha reads these documents yet.",
    },
  ],
} as const satisfies PageType
