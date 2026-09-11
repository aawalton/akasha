import type { Finding } from "akasha/domains/findings/finding.page-type.types.ts"

export const noMemoryLimitTheWorkstationHoldsIsAPageProperty = {
  id: "01a09183-0019-70d5-a5f9-f17677ae1b79",
  type: "finding",
  slug: "no-memory-limit-the-workstation-holds-is-a-page-property",
  domain: "domain/memory-limit",
  claim:
    "Not one memory limit the workstation runs under is the value of a page property. Six are constants exported from module code, one is an environment variable in a file outside the repository, and the rest are systemd settings in units and drop-ins. So no page says what any of them is, nothing refuses a change to one, and the only memory ceiling the page system does model is read by no code.",
  evidence:
    "Constants in module code, read on 2026-09-11:\n  memory-reaper-legs.module.code.ts:10  MAX_RSS_GB = 32\n  memory-reaper-legs.module.code.ts:34  MAX_TREE_PSS_GB = 32\n  memory-reaper-global.module.code.ts:8  GLOBAL_MIN_AVAIL_GB = 4\n  memory-reaper-global.module.code.ts:10 GLOBAL_MIN_FREE_SWAP_GB = 4\n  memory-reaper-global.module.code.ts:95 GLOBAL_RECOVERY_WINDOW_SEC = 60\n  memory-guard.module.code.ts:6         MIN_FREE_MEMORY_GB = 8\n\nOutside the repository: NODE_OPTIONS is --max-old-space-size=61440 in ~/.claude/settings.json, beside CLAUDE_CODE_MAX_CONCURRENT_SUBAGENTS at 65.\n\nIn systemd rather than in a page: the oomd thresholds, and the Memory settings no unit states at all. seat-launching states CPUQuota, CPUWeight and TasksMax and no Memory setting.\n\nThe one memory ceiling the page system models is max-memory-mb, declared on module-property-group and on code-file-property. No page states a value for it and no code reads it, which is recorded separately.\n\nmemory-reaper-config.module.code.ts:37-38 derives kilobyte forms from effective values rather than from the constants directly, so an override may exist there; the numbers themselves are still written in code rather than on a page.",
} as const satisfies Finding
