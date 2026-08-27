---
id: 5fb8f8b6-99f3-5787-b9fd-48710b4c5820
slug: redirect-records-unread
page-type-slug: finding
title: "A redirect records a reading the reader never saw"
domain-slug: domain/global
---

# Claim

`tools/read.ts` refuses to print into a pipe so that no reading is recorded unless the body reached the agent, but a shell redirect to a file satisfies the recorder while the body still never reaches the agent.

# Evidence

Measured 2026-08-20. `bun tools/read.ts --file-path <paths> | head` is refused with "nothing was read — this is printing to a pipe, so no body would reach you and a record would have said one had."

The same command with `> /var/tmp/aine/reads.txt` is not refused. It writes the whole reading to disk, records every path as read, and clears the `read-what-governs` refusal on the next write. The agent sees only whatever it chooses to print back from the file, or nothing at all.

Run here against `domains/code-comment.md`, `domains/code-quality.md`, `domains/file-kinds/test-file.md`, `domains/file-kinds/typescript.md`, `domains/test.md` and `tools/tests/seat-stated.on-demand.test.ts`. All six were recorded as read from the redirect, and the write that had been refused for them then landed.

The detection appears to test whether stdout is a TTY rather than whether it is a pipe, so every non-terminal destination but the pipe passes. A redirect and a pipe deliver the same amount of the body to the agent, which is none.

`domains/repos/instructions-repo.md` carries the rule this defends, Recorded Reading, and `domains/agent-governance.md` carries the design line it serves: a reading a seat owes arrives as a refusal of the act that needs it.
