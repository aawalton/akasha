---
id: d04e09e0-20f6-5574-97b4-45c3b2f01d45
slug: harness-documents-outside-version-control
page-type-slug: finding
title: "Harness documents outside version control"
domain-slug: domain/alan-harness
---

# Claim

Authored documents that shape how Alan's harness behaves accumulate in `~/agents`, which is not a git repository. A change to one leaves no history, names no author, passes no gate, and cannot be reverted or reviewed. Nothing governs the directory, and nothing reports what is in it.

# Evidence

`git -C ~/agents rev-parse --git-dir` returns "fatal: not a git repository (or any parent up to mount point /var)". The directory holds 6228 entries and 13G, measured 2026-08-11.

Runtime state is expected there — `spawn-state.json` and `spawn.log` per agent are artifacts, not documents. What sits beside them is not:

- `~/agents/amy/email-rules.md`, 29,626 bytes. Mail triage rules. `packages/alanwalton/email/google/src/email/rules-push.ts` hard-codes this path, so the file is read by deployed code. Filed separately against `alan-harness-routine`.
- `~/agents/amy/safety-model.md`, 11,542 bytes.
- `~/agents/amy/voice-reward-map.md`, 39,274 bytes.
- `~/agents/amy/erin-solstice-persona-raw.md` and `~/agents/amy/euphemia-fontaine-persona-raw.md`, 17,733 and 24,792 bytes — persona material authored outside the corpus that governs personas.
- `~/agents/amy/notes.md` and `~/agents/amy/recall.md`, 193,618 and 101,471 bytes.

These are one agent's directory. The reach of each beyond `email-rules.md` is unverified: whether any other is read by code, and whether any carries a decision that binds, has not been checked.

This is not the delivery-boundary problem. A file here already changes without a deploy, so it satisfies `alan-harness`'s Intent as written. It fails File First on `global` differently: the data is in a file, but in one with no history, so the file cannot answer who changed a rule or when, and the write cannot be refused. `domains/folders/instructions-repo.md` and `domains/folders/memory-repo.md` both govern `**` of their repos; no document governs this tree at all.

Filed rather than folded into `amy/harness-without-a-deploy` deliberately: Alan and I settled that initiative's objective set at three, and agreed this gap belongs outside it.
