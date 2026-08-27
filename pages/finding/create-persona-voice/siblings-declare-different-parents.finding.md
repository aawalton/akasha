---
id: aaec7436-3f07-54db-94d6-c8bc03e55bf6
page-type-slug: finding
title: "Siblings declare different parents"
domain-slug: task/create-persona-voice
---

# Claim

The two task documents in `domains/tasks/persona-craft/` declare different parents: `create-persona-voice.md` says `domain-parents: task`, and `describe-persona-appearance.md` says `[persona-craft, task]` with `domain-owner: persona-craft`. The `domain-edges` check passes either way.

# Evidence

Filed by the seat dispatching the 2026-08-14 `review-instructions` reading of `domains/tasks/persona-craft/create-persona-voice.md`, from that reading's hand-back.

I read both frontmatters myself and confirmed the two declarations. `domains/domain-parent.md` says a domain's parents are what a reader must read before acting there, so the two documents disagree on whether `persona-craft` is one of those for a seat writing a persona's voice.

`domains/domain-championing.md` requires `domain-owner` to be stated only where several parents are named, so `create-persona-voice.md` naming one parent is internally consistent — the asymmetry is between the two files, not inside either.

The 2026-08-14 reading of the other sibling reached the same asymmetry from its own side and added what the extra parent buys: nothing at the read. `domains/roles/persona-craft.md` declares `instructions-path: domains/tasks/persona-craft/*.md`, which matches both documents, so a seat is handed that role whether or not its task names it as a parent. I read that glob myself and confirmed it.

Not measured: I did not run `domain-edges`, so its passing either way is the readings'. Nothing here says which declaration is right.
