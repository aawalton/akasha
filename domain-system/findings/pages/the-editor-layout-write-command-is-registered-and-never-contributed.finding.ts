import type { Finding } from "../finding.page-type.ts"

export const theEditorLayoutWriteCommandIsRegisteredAndNeverContributed = {
  id: "01a06816-69fa-7004-b122-c905090f0185",
  pageTypeSlug: "finding",
  slug: "the-editor-layout-write-command-is-registered-and-never-contributed",
  domainSlug: "workspace-package/editor-extension",
  claim:
    "`editor-layout-panel` registers the command `opsEditorLayout.writeNow`, and the extension manifest contributes no such command. A command the manifest does not name is callable through `executeCommand` and invisible in the palette, so the one way Alan could ask for the arrangement to be written now is a way he cannot reach. Every other command this extension registers is contributed.",
  evidence:
    "The manifest contributes fourteen commands: `agentTerminalName.syncNow`, `opsStatusBar.refreshNow`, `opsTranscript.open`, four `refreshNow` commands for the agent, domain, work and page trees, and seven `opsAgentTree.*` seat actions. `opsEditorLayout.writeNow` is in none of them, and it is registered at the end of the editor-layout activation beside the four event subscriptions.\\n\\nThe write still happens: a change to the tabs, the groups or the terminals schedules one after a settling pause, so the arrangement is projected without anybody asking. What is missing is only the manual trigger, which is why this has gone unnoticed.\\n\\nThe call taken in Alan's absence: the registration is left as it stands and the manifest is left as it stands, because adding a palette entry is a mark on Alan's own command palette he did not ask for, and removing the registration would take away a trigger that costs nothing. What it would take if he wants it is one entry in `contributes.commands` naming it.",
} as const satisfies Finding
