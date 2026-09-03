import type { Finding } from "../finding.page-type.ts"

export const theSixSettingsFilesAreWhatTheSupervisorReadsToRunAnAgent = {
  id: "01a0657f-4923-7aa6-83a2-cc0ca006b814",
  pageTypeSlug: "finding",
  slug: "the-six-settings-files-are-what-the-supervisor-reads-to-run-an-agent",
  domainSlug: "domain/akasha-migration",
  claim:
    "`settings/` is not configuration waiting to be moved. Its six files are what the supervisor reads to run an agent at all: the hooks, the launch flags, the tool access, the mcp servers, the remote control and the harness config. Moving the folder while a swarm runs takes agent spawning with it. It moves when `tools/` moves and not before.",
  evidence:
    "Read 2026-09-02 22:45. Twelve readers name a file under `settings/` by path, all under `tools/`, and none writes one.\n\n`settings/agents.json` is read by `tools/lib/supervisor-spawn-settings.ts:11`, `tools/lib/hook-settings.ts:5`, `tools/agent-settings.ts:7` and `tools/commands/seat/fleet/restart.ts:11`. `supervisor-spawn-settings.ts:109` already says what happens without it, telling the caller to restore the file. `settings/claude-config.json` is read at `tools/lib/supervisor-claude-config.ts:3`, `settings/remote-control.json` at `tools/lib/supervisor-remote-control-env.ts:41`, `settings/launch-flags.json` at `tools/lib/launch-flags.ts:6`, `settings/mcp-servers.json` at `tools/lib/mcp-registry.ts:11` and `settings/tool-access.json` at `tools/lib/tool-access.ts:6`.\n\nOne of the six already reaches the other way. `tools/statusline.sh:7` records that the statusline moved to `akasha/code-system/shell-scripts/pages/` and that `settings/agents.json` is what names it, so the file is a live pointer into akasha rather than a leftover of the old system.\n\nThe shape is the one `dotfiles/bin/akasha` has: a small file outside the folder that everything inside depends on being where it is. Neither is content to adapt, and each stops the swarm rather than one system.",
} as const satisfies Finding
