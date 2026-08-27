---
id: a76ee8af-6b03-50c9-808b-707b15935fab
page-type-slug: finding
title: "Reading refusal unclearable"
domain-slug: domain/agent-harness
---

# Claim

A seat refused for not having read a governing document cannot always clear the refusal, because the `Read` tool answers a repeat call as wasted without recording anything, and the refusal permits no tool that would record one.

# Evidence

Observed on 2026-08-16 while running about twenty subagents from one seat, all reaching the instructions and memory repositories.

`page-types/persona.md` changed at 01:13:01. The seat had read it at 00:31:24 and was refused, with "Permitted while this stands: Read, Grep, Glob, and nothing else." Reading it with the `Read` tool cleared that once. Later in the same session the identical refusal returned, naming the same document and the same two timestamps, and this time `Read` answered "Wasted call — file unchanged since your last Read" and recorded nothing, so the refusal stood. Calling `Read` again with an explicit offset of 1 and a limit above the file's line count performed a real read and cleared it.

A subagent hit the same wedge harder and lost its whole batch of twelve. Its report: about a dozen consecutive refusals across `Write`, `Edit` and `Bash` — including a bare `true` — naming eleven documents, while `Read` answered that each was unchanged since its last read. It could not run `bun tools/read.ts`, the reader that records, because `Bash` was among the refused.

Readings already on record also went missing. `page-types/page.md` and `domains/repos/instructions-repo.md` were both read through `bun tools/read.ts` earlier in this same session, unpiped, and the tool printed their recorded timestamps back. Both later reported "nothing on record says you have read it".

The two together are what makes it a wedge rather than a nuisance: a reading can leave the record, and the tool a refused seat is permitted to use will not put it back once it believes the file is unchanged.

NOT ESTABLISHED: whether concurrent subagents sharing one seat's identity are what drops the record. It fits the timing and nothing was measured.
