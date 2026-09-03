import type { Finding } from "../finding.page-type.ts"

export const sixLiveReadersOpenedAblatedOpsFilesByPathAfterTheContentHadCarried = {
  id: "01a06877-9eeb-7000-a919-190ef814d03f",
  pageTypeSlug: "finding",
  slug: "six-live-readers-opened-ablated-ops-files-by-path-after-the-content-had-carried",
  domainSlug: "domain/akasha-migration",
  claim:
    "Across one 145-pair ablation, six live readers still opened an ops file by path or by command name after its content had genuinely carried into akasha, so the per-file content match constraint 23 asks for is necessary and not sufficient: a reader-by-path scan has to run before the removal, not after it.",
  evidence:
    "Found by scanning all 261 ablated paths for surviving references, and by reconstructing each ops page's `path:` front matter into its `ops <words>` invocation and scanning for that. The six: (1) akasha/seat-system/terminal-init/terminal-account-launchers/terminal-account-launchers.module.code.ts line 23 composes the live `cna` shell function around `claude-account add`; (2) tools/verb-server.ts line 73 dynamically imports tools/work-tree.ts to serve the editor Work panel; (3) tools/lib/check-workflow/check-configs-addons-held-territory.ts line 13 names tools/commands/check-held-addon-structure.ts as a CI check's `script`; (4) tools/lib/supervisor-mcp.ts line 27 spawns tools/playwright-storage-state.ts by relative path; (5) and (6) akasha/machines/provisioning/scripts/provision-workstation/provision-workstation.shell-script.shell.sh lines 104 and 166 run `temper community-addon install` and `claude-account sync-aliases` on a fresh workstation. Two were repaired forward, two were restored from the removing commit's parent, and two files were kept. The scan was seeded first against tools/work-tree.ts, a path with a known live reader, and reported 4 hits. The instrument that missed all six beforehand checked only that the akasha counterpart existed, was tracked in HEAD, and ran over fifteen lines \u2014 existence of the successor says nothing about who still opens the predecessor.",
} as const satisfies Finding
