---
id: 421ae072-a37b-5257-bd1b-8f3a4905f9cf
page-type-slug: finding
title: "Command hole renders bare stem"
domain-slug: page-type/refusal
---

# Claim

The `{command}` hole in `refusals/command-declaration-dropped.md` renders a bare stem for a file directly under `tools/` — "the `ops` command `read`" — which nobody can type. The command is `ops instructions read` or `ops memory read`, decided by the `repos:` list inside the block being dropped. `d410a9eb5` cut the namespace deliberately, to stop naming one the tool had not declared. A third option is untaken: render the namespaces from the declaration the gate already reads.

# Evidence

Filed by the seat dispatching the 2026-08-15 `review-instructions` reading of `refusals/command-declaration-dropped.md`, from that reading's hand-back. Its report stands at `~/agents/claude-refusal-archivist-review-instructions/review-command-declaration-dropped.md`.

I read the document at `152e0e34a` and confirmed the shape: it declares `command` among its holes and names the two declaration forms, the `tools/` one carrying `summary:` then `repos:`.

That reading reports running the gate against a live removal of `tools/commands/ask-alan.ts`, which rendered this refusal and then passed once the register line was pending in the same call, so the rendering path is one it exercised rather than read.

Not measured: I did not render the refusal myself or open `d410a9eb5`, so the bare stem and the reason for the earlier cut are that reading's. Nothing here says what rendering both namespaces would cost a reader mid-refusal.
