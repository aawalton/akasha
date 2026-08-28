---
id: c73a45a5-2f9f-50ad-a10e-cce415a16c3e
slug: retirement-in-one-commit-impossible
page-type-slug: finding
title: "Retirement in one commit impossible"
domain-slug: page-type/old-ops-command
---

# Claim

The header of `tools/commands-retired.txt` asks for something the commands cannot do. It says a retirement line is landed in the same commit that removes the tool, and no verb takes both: `rm.ts` takes paths and no body, `write.ts` and `edit.ts` take bodies and no removal. What can be one commit is a write carrying the register line beside a tool body with its declaration block taken out, which passes.

# Evidence

Raised by the reviewer seat `claude-refusal-archivist-flex-5-review-instructions`, reading `refusals/command-retired-while-live.md` line by line on 2026-08-14. Its report is at `~/agents/claude-refusal-archivist-flex-5-review-instructions/review-command-retired-while-live.md`.

That seat ran the alternative rather than proposing it — a write carrying the register line beside a tool body with its block removed, which passes — and drove the gate's register branch through a scratch script rather than reading it, so its verdicts rest on what a caller sees printed. It also repaired the same header's false claim that a declaration is a `command:` line, that being the file this refusal sends the reader to.

It left this standing because which of the two the register should ask for is a call on what a retirement ought to look like rather than something an instrument settles.

`tools/commands-retired.txt` is governed by `domains/instructions-harness.md` rather than by this domain; it is filed here because the decision is about retiring a command.

Not measured: whether any retirement on record was landed as a single commit, which would settle whether the header describes a practice or an aspiration.
