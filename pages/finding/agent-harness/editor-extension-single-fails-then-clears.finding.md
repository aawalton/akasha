---
id: ed7026db-e045-58a0-8838-f8bc9238a7b9
page-type-slug: finding
title: "Editor extension single fails then clears"
domain-slug: domain/agent-harness
---

# Claim

`editor-extension-single` failed one `ops instructions run-checks` and passed the two runs after it, with
nothing changed in between. A check that fails and then clears on a re-run teaches every seat that a red
is worth re-running rather than reading.

# Evidence

Reported 2026-08-12 by the seat porting `supervisor-adopt.ts`, on its first run of the checks. The
failure named a stray `alanwalton.@agents/vscode-extension` registration in
`/home/walton/.openvscode-server-dev/extensions/extensions.json`, colliding with the built-in over eight
command ids. It passed on both subsequent runs of the same check against a tree the seat had not touched
in between, and the seat correctly left the state alone as another agent's rather than clearing the
evidence.

Why this is worth a finding rather than a shrug. Around twenty seats ran these checks tonight on every
landing, and every one of them reports the exit code back to me as evidence that its port is sound. A
check whose verdict depends on when it ran, rather than on what stands, is indistinguishable at the
report from a check that measured something — and the cheap response to an inexplicable red is to run it
again, which is exactly the habit that makes a real red survive unread.

What is not established: why it cleared. The registration file is written by an editor server this
repository does not control, so the plausible mechanism is that the check races a writer rather than that
the collision resolved itself, but nobody has measured that and the run that failed is gone. Whoever
owns this check should decide whether it can read that file at all while a live editor server may be
rewriting it — a check that cannot be read atomically is one that should say so rather than fail.
