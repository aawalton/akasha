import type { Finding } from "../finding.page-type.ts"

export const theLastPollToFinishIsNotTheOneThatReadLatest = {
  id: "01a06816-69fa-7003-9357-4cdc4fc7183d",
  pageTypeSlug: "finding",
  slug: "the-last-poll-to-finish-is-not-the-one-that-read-latest",
  domainSlug: "workspace-package/editor-extension",
  claim:
    "Four of this extension's features poll on a timer while other triggers also start a read, and each read takes longer than the interval between triggers. Two reads in flight both write the same held state, so what stands is whatever finished last rather than whatever read latest \u2014 with no error anywhere, because nothing was wrong with either read. Each of the four now holds one read in flight and makes a trigger arriving mid-read wait for it.",
  evidence:
    "The terminal renamer is the clearest case. A sweep takes as long as `readProcessIds` waits on every terminal, bounded at `PROCESS_ID_TIMEOUT_MS`, which is longer than the one-second poll; nine other triggers besides the poll can start one, being two file system watchers across every seat directory, three terminal events and a command. The state two sweeps race for is `lastAppliedByTerminal` and `lastColorByTerminal` in `terminal-marks`, which `terminal-sync` reads to decide whether a tab already carries the name it is about to be given and writes after it applies one. Two sweeps interleaved read that map before either has written it, so both apply, and the tab ends up named for a seat that has since moved.\\n\\nThe status bar carries a measured symptom of the same shape. Every drawn slot carries `opsStatusBar.refreshNow` as its click command, so a run of clicks started a run of refreshes, each spawning its own `claude-usage` child and each contending with the others for the store and the CPU: on a box under load the clicks that asked for a faster answer bought a slower one. What a click promises is now the reading in hand rather than another attempt at it.\\n\\nThe transcript panel and the agent tree hold the same guard for the same reason, and the transcript panel's version is recorded separately against the cost of reading a transcript whole.\\n\\nThe four are alike enough that a fifth polling feature added without the guard would read as working until two triggers overlapped.",
} as const satisfies Finding
