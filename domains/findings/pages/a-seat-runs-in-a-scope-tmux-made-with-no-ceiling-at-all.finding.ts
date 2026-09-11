import type { Finding } from "akasha/domains/findings/finding.page-type.types.ts"

export const aSeatRunsInAScopeTmuxMadeWithNoCeilingAtAll = {
  id: "01a0918f-0301-75b3-9a69-6fb97647cdc1",
  type: "finding",
  slug: "a-seat-runs-in-a-scope-tmux-made-with-no-ceiling-at-all",
  domain: "domain/cpu-limit",
  claim:
    "The processor ceiling seat-launching states reaches one seat out of seventeen. It is given to the scope that begins the tmux server, and every seat after that runs in a pane scope tmux made itself, which states no processor ceiling, no memory ceiling and a task count of 76091. So the invariant that a seat's scope is capped at eight of the machine's cores is true of one scope and false of the sixteen doing the work.",
  evidence:
    "Read on 2026-09-11. The host has 24 processors.\n\nOne scope named tmux-seat-ember-1788900666586.scope has cpu.max of `800000 100000`, which is the 800 percent seat-launching composes from SEAT_CORES of 8.\n\nSixteen scopes named tmux-spawn-<uuid>.scope have cpu.max of `max 100000`, meaning no ceiling. systemctl --user show of one gives Description='tmux child pane 175793 launched by process 7354', CPUQuotaPerSecUSec=infinity, MemoryMax=infinity, TasksMax=76091. The name and the description are tmux's own, not seat-launching's, whose unit names are tmux-seat-<name>-<millis>.\n\nseat-launching.module.code.ts:273 makes a scope only where no tmux server is up: `const scopeUnit = (await serverUp(how)) ? null : scopeUnitFor(name, how.at())`. underScope at line 189 returns a bare tmux call where scopeUnit is null. So the ceiling is given once, to whichever seat happens to start the server.\n\nseat-launching.module.ts states the invariants 'A seat's scope is capped at eight of the machine's cores', 'A seat's scope bounds how many tasks the seat may make' and 'A cap on the scope holds over every process and thread the seat begins'.\n\nLoad average at the reading was 17.18 over one minute against 24 processors, and /proc/pressure/cpu gave some avg10=7.65 with full at 0, so nothing was being starved at that moment.\n\nNo seat scope has ever been throttled: nr_throttled and throttled_usec are 0 in every one read.",
} as const satisfies Finding
