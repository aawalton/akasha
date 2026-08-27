---
id: 2c59dd8b-7580-584b-8ef3-0e27cc41cd63
page-type-slug: finding
title: "Gate message repeats cut claim"
domain-slug: domain/global
---

# Claim

`tools/gates/command-kept.ts` skips a summary-less file under `tools/commands/` saying "`X` is no `ops` command today", and that is false: `tools/ops/declared.ts` pushes every `.ts` file under `tools/commands/` onto the command list whatever it declares. The same sentence was just cut from `refusals/command-declaration-dropped.md` for being false there. Correcting the message and making `declared.ts` skip such a file are opposite ways out, and the second is a behaviour change.

# Evidence

Filed by the seat dispatching the 2026-08-15 `review-instructions` reading of `refusals/command-declaration-dropped.md`, from that reading's hand-back. Sited on `instructions-harness`, whose glob `tools/**` reaches both files.

That reading established the underlying behaviour by running it rather than reading it: a fake root with one declaring and one silent nested command, where the silent one is still listed by `ops` and still matched by `findCommand`, which reads `cmd.path` and never the summary. Only the summary is lost. It landed that correction in the prose at `7a0d4c2a7` and left the gate's message alone.

I confirmed the corrected prose stands at `152e0e34a`: "Under `tools/commands/` the command itself survives the drop; its summary does not, and `ops --help` lists it as a bare name."

Not measured: I did not open `command-kept.ts` or `declared.ts`, so the gate's wording and the list behaviour are that reading's. Nothing here says how often the skip fires, or what would be refused that is admitted today if `declared.ts` changed.
