import type { Finding } from "../finding.page-type.ts"

export const twoToolsComposeScriptsAreLiveDependenciesOfCarriedSeatCode = {
  id: "01a06864-e359-7000-bdff-b89ea00ff37b",
  pageTypeSlug: "finding",
  slug: "two-tools-compose-scripts-are-live-dependencies-of-carried-seat-code",
  domainSlug: "domain/akasha-migration",
  claim:
    "`tools/compose-boot.ts` and `tools/compose-subagents.ts` look like unmigrated ops commands and are not: carried akasha seat code spawns both by path, so ablating either breaks the live seat spawn.",
  evidence:
    'akasha/seat-system/supervising/supervisor-boot-prompt/supervisor-boot-prompt.module.code.ts line 5 holds `const COMPOSE_RELPATH = "tools/compose-boot.ts"` and spawns it at line 31. akasha/seat-system/supervising/supervisor-spawn-agents/supervisor-spawn-agents.module.code.ts line 8 holds `const COMPOSE_COMMAND = "compose-subagents"` and spawns <root>/tools/compose-subagents.ts at line 75. Their old ops pages, ops-seat-boot and ops-seat-subagents, were therefore left standing rather than ablated with the rest of the seat block. compose-subagents additionally reads pages/subagent-kind/*.md, which still stands as two markdown files against zero .subagent-kind.ts pages in akasha, so the data behind it has not moved either. Neither can go until the seat start path itself carries.',
} as const satisfies Finding
