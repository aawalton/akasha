import type { Finding } from "akasha/domains/findings/finding.page-type.types.ts"

export const nineGuardsSpendHalfAProcessorSecondBeforeEveryBashCall = {
  id: "01a09226-248e-7ea0-963f-b366cb16dbf1",
  type: "finding",
  slug: "nine-guards-spend-half-a-processor-second-before-every-bash-call",
  domain: "domain/cpu-limit",
  claim:
    "Nine guards run before every bash call an agent makes, and together they spend about half a processor second and a third of a second the call waits through. Over twenty-seven calls each of the nine took between 35 and 48 milliseconds of elapsed time and between 0.056 and 0.060 processor seconds. The spread between the cheapest and the dearest is so small that what is paid for is a process starting and loading its modules rather than the rule that process judges by. state-subagent, which runs at a subagent's start and stop, took 182 milliseconds and 0.22 processor seconds over five runs. Seventeen seats make these calls, so this is spent many times over at once.",
  evidence:
    "hook-dispatch now opens a cost before the hooks of a call and takes a reading as each hook's child is reaped, appending one line beside that hook's own page. The numbers here are read out of those lines.\n\nThe mean elapsed milliseconds over twenty-seven calls: block-akasha-shell-writes 48.2, block-typecheck 43.1, block-destructive-git 37.9, block-biome 36.8, name-subagent 36.4, block-combined-akasha-calls 35.9, block-bun-test 35.8, block-git-writes 35.4, block-subagent-audit 35.3. They add to 344.8, which is what a bash call waits through before it starts.\n\nThe mean processor seconds over the same runs are between 0.0563 and 0.0600, adding to 0.519.\n\nThe worst single run of each: block-typecheck 219 milliseconds, block-akasha-shell-writes 165, block-destructive-git 101, and the rest between 42 and 67.\n\nEvery one of the nine has the same count of runs, so all nine run on every bash call rather than some being passed over.\n\nThe processor time in a line is the child's, taken as the difference in what this process has reaped across that hook's own window, so it is that hook's whole run. The memory in a line is this process's rather than the child's, since the kernel counts nothing of a reaped child's peak.\n\nblock-akasha-reads shows one run because it is over the Read tool rather than over Bash.",
} as const satisfies Finding
