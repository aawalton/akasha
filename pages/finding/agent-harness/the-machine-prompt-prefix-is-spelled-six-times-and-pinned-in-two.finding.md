---
id: b203e427-0461-58d5-81bf-5384d7056327
slug: the-machine-prompt-prefix-is-spelled-six-times-and-pinned-in-two
page-type-slug: finding
title: "The machine prompt prefix is spelled six times and pinned in two"
domain-slug: domain/agent-harness
---

# Claim

The machine-prompt opening `[supervisor]` is spelled in six places across the instructions repository, the check that exists to pin it reaches only two of them and both are outside this repository's TypeScript, and one of the unread copies carried a comment claiming the check held it.

# Evidence

Measured on 2026-08-13. The six spellings:

    tools/checks/prompt-shape-mirror.ts:68     the check's own EXPECTED table
    tools/checks/resume-notices.ts:75          a second check, as `OPENING`
    tools/lib/supervisor-resume-notices.ts:94  exported, and read by supervisor-resume-asks.ts
    tools/lib/prompt-shape.ts:102              the port that crossed on 2026-08-13
    tools/tests/supervisor-resume-notices.test.ts:32   a suite's local copy
    tools/tests/prompt-shape-vectors.ts:54     the new port's vectors

`prompt-shape-mirror.ts` holds its table against `tools/hooks/clear-terminal-alert.sh` and against `packages/agents/shared/prompt-shape.ts` in the CODE repository, read through `repo.roots.code` at line 147. `ops instructions run-checks` says so in its own words: three prefixes held against the bash hook and against the code repository's file. It reaches no TypeScript declaration standing in this repository.

The sharp part is not the count. `supervisor-resume-notices.ts` carried, immediately above its own copy, the sentence "Held to `tools/checks/prompt-shape-mirror.ts`, which pins this value", and below it the warning that "a copy it does not read is a copy free to drift out from under it" — a file describing its own failure mode while believing itself exempt. That comment is corrected; the structure it misdescribed is not.

Nothing has drifted. Every one of the six reads `[supervisor]` today, which is why this is filed rather than repaired in the same breath: there is no fault to fix, only an instrument narrower than what everyone believes it covers.

What the porting seat named, and what makes this actionable rather than merely true: the check's canonical arm matches an `export const NAME = "value"` declaration, so it can be repointed at `tools/lib/prompt-shape.ts` on the day the code repository's copy is removed — where an import in place of a declaration would leave that arm finding no name and refusing. The repoint belongs with the removal delegation, which has not run.
