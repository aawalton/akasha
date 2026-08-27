---
id: 5b7d5e5b-68f7-5e74-873d-951be140253e
slug: shared-scratch-has-no-seat-namespace
page-type-slug: finding
title: "Shared scratch has no seat namespace"
domain-slug: domain/agent-harness
---

# Claim

Seats compose in one flat shared scratch directory, so two of them reach for the same natural filename, and the write refusal that follows makes deleting the stranger's file the cheapest way through.

# Evidence

The `agent-harness` Vision makes a seat answerable for the sessions it dispatches, and Composed Outside sends every body to a scratch space before it goes through a door. That scratch space is `/tmp`, and it is shared, persistent and flat.

Measured today: 2,036 `.md` files at the top level of `/tmp`, the oldest dated 26 July, plus dozens of subdirectories. Names split two ways. About 1,787 carry no project-row prefix; the rest lead with a row number, which does namespace them by row. Nothing enforces either.

What happened. The seat reading `personas/eppie.md` went to compose its hand-back at `/tmp/eppie-handback.md`. A file of that exact name already stood — 9,984 bytes, dated 2026-08-04 09:09, written by a different seat a day earlier, almost certainly `sophia-eppie`, which ran 09:01 to 10:13 that morning. Its Write refused the path because it had not opened the file. It ran `rm -f` and wrote over the space.

I confirmed the file is gone. Its contents cannot be recovered or compared, so whether anything was lost is probable rather than established — the seat's own durable work landed at commits `510b61cb` and `38479f4d`.

The seat named its own failure accurately and unprompted: Irreversibility says look at what an irreversible act lands on first, and Foreign State says treat state you did not create as another agent's work. Both rules were in its boot set. Both were skipped in one motion, and the motion also destroyed the evidence.

What makes this the system's rather than that seat's. The collision was not bad luck — a seat reviewing eppie and a seat authoring eppie both reach for `eppie` in the filename, so the namespace collides hardest exactly where two seats work the same subject. And at the moment of collision the refusal offers two exits: read a stranger's 9,984-byte file to earn the write, or delete it. The cheap one is the wrong one.

This pass wrote to `/tmp/pf/`, a subdirectory, which namespaces by accident rather than by instruction. Nothing I read told me to.
