import type { Finding } from "../finding.page-type.ts"

export const twoToolsComposeScriptsAreLiveDependenciesOfCarriedSeatCode = {
  id: "01a06864-e359-7000-bdff-b89ea00ff37b",
  pageTypeSlug: "finding",
  slug: "two-tools-compose-scripts-are-live-dependencies-of-carried-seat-code",
  domainSlug: "domain/akasha-migration",
  claim:
    "`tools/compose-boot.ts` and `tools/compose-subagents.ts` look like unmigrated ops commands and are not: carried akasha seat code spawns both by path, so ablating either breaks the live seat spawn.",
  evidence:
    'akasha/seat-system/supervising/supervisor-boot-prompt/supervisor-boot-prompt.module.code.ts line 5 holds `const COMPOSE_RELPATH = "tools/compose-boot.ts"` and spawns it at line 31. akasha/seat-system/supervising/supervisor-spawn-agents/supervisor-spawn-agents.module.code.ts line 8 holds `const COMPOSE_COMMAND = "compose-subagents"` and spawns <root>/tools/compose-subagents.ts at line 75. Their old ops pages, ops-seat-boot and ops-seat-subagents, were therefore left standing rather than ablated with the rest of the seat block. The data behind compose-subagents has since moved: commit afb69e4c3c landed explore and general-purpose as .subagent-kind.ts pages with subagent-prompt sidecars and ablated pages/subagent-kind/, which broke the script outright, since its reader was a readdirSync over that folder rather than a registry lookup. Commit 4aef10f20f repointed it onto everyOfType(root, "subagent-kind") and the sidecars, and it renders both kinds again. compose-boot.ts is untouched and its half of this claim is unchanged. Neither can go until the seat start path itself carries.',
} as const satisfies Finding
