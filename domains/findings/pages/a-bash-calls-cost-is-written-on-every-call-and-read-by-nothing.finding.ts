import type { Finding } from "akasha/domains/findings/finding.page-type.types.ts"

export const aBashCallsCostIsWrittenOnEveryCallAndReadByNothing = {
  id: "01a09512-beaf-7b7b-bdf9-7954669ae8fc",
  type: "finding",
  slug: "a-bash-calls-cost-is-written-on-every-call-and-read-by-nothing",
  domain: "domain/cpu-limit",
  claim:
    "Every bash call an agent makes appends one row of what that call spent beside its seat's page, and nothing reads those rows. One seat's file has already rolled past its ceiling into a second part. Each row carries the wall time, the child processor seconds and the peak memory of one call, tagged with the seat and the first line of the command. The only reader of an entries file for cost walks the pages of checks alone, and the command measuring that could reach a seat's rows excludes them by the shape of the file name it filters on.",
  evidence:
    "code/shell-scripts/pages/bash-call-weighing/bash-call-weighing.shell-script.shell.sh appends the row from an exit trap, and agents/hooks/agent-hooks/weigh-bash-call/weigh-bash-call.agent-hook.code.ts settles at line 112 which file that row goes in. The file is the seat's own entries jsonl.\n\nchecks/modules/measuring/check-measuring.module.code.ts holds the only cost reader over an entries file. Line 9 fixes what that module walks to the code-check page type, and line 310 iterates that page type alone, so a seat's page is never visited.\n\ncommands/pages/measure/command/command-measuring/command-measuring.module.code.ts filters at line 20 on a file name ending .command.entries.uncommitted.jsonl, which excludes .seat.entries.uncommitted.jsonl by construction.\n\ncommands/pages/measure holds attribute, audit, change, check, checkout-counting, claude-account, command, complexity, learning, page, performance, persona, repo and tabling, and neither a seat nor a bash.\n\nA reader is one filter from done: heldIn in check-measuring would have to take a page type other than code-check.\n\nA row written before 137ed2adbee8 may state that a peak was measured where nothing measured it, so a reader must discount peakMeasured before that commit.",
} as const satisfies Finding
