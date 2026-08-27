---
id: 61eed3b1-e399-5950-8994-3f312dc819a5
slug: finish-holds-a-second-exit-decision
page-type-slug: finding
title: "Finish holds a second exit decision"
domain-slug: barred-meaning/project
---

# Claim

`ops project finish` classifies a thrown value with its own copy of the decision `@shared/cli-core/exit` says it is the one place for, and the two disagree on three of five classes: an `InputError` exits 3 rather than 1, a self-coded `CliError` loses its own code, and an untagged defect exits 3 rather than 70. Nothing outside that module's own docblock records it, so a caller keying on the exit code cannot tell an unhandled defect from a transient one.

# Evidence

Read out of both modules 2026-08-07.

`packages/shared/cli-core/src/exit.ts` declares `EXIT = { OK: 0, INPUT: 1, DATA: 2, OPERATIONAL: 3, UNCLASSIFIED: 70 }`, and `exitCodeForThrowable` is one line: `isCliError(err) ? err.code : EXIT.UNCLASSIFIED`. Its docblock says why it is the one place: "in a detached child ONE throw passes through two of them … Two copies of the decision could report the same event as two different numbers."

`packages/alanwalton/projects/cli/src/pure/decide-finish-throw-route.ts` is the second copy, reached from `finish.ts:238`, also one line: `thrown instanceof DataError ? EXIT.DATA : EXIT.OPERATIONAL`.

Five classes, three disagreements. `DataError` 2 and 2. `OperationalError` 3 and 3. `InputError` 3 here, 1 canonically. `CliError(msg, code)` 3 here, its own code canonically. Untagged `Error` 3 here, 70 canonically.

WHY THE THREE ARE MEANINGS THE RUN NEVER ESTABLISHED. Exit 3 is the transient class — not the caller's fault, retry may succeed. So an `InputError` out of `finish` tells a caller to retry an invocation that will fail identically every time. And 70 says nothing was established about what went wrong; reported as 3, an unhandled defect reads as a network blip.

IT IS DELIBERATE, AND THAT IS NOT THE SAME AS BEING RECORDED. The docblock says so — "DELIBERATELY NOT `exitCodeForThrowable` … delegating would move the exit code callers already read. That is a contract change, owned by a row that decides it" — and both sides are pinned in `decide-finish-throw-route.unit.test.ts`, so it cannot drift unremarked. What no row holds is the decision. Nothing in the memory corpus mentions `exitCodeForThrowable`.

NOT CLAIMED. Not which side should win, not that any caller has been misled, and not a count of other verbs holding a second copy — only this one was examined.

Raised while ingesting `dirty/skills/agent-harness/findings/exit-codes-and-output-channels.md`, whose July entry recorded the same table from inside a project forbidden to change it. Unchanged since.
