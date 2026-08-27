---
id: 64625a32-1c6c-5521-aabe-86cd95fc0b11
page-type-slug: finding
title: "Git guard substitution bypass"
domain-slug: page-type/message
---

# Claim

A destructive-git guard (`block-destructive-git.sh`) refuses a blocklisted git operation typed directly but lets the same operation through inside a command substitution nested in an unrelated command's argument, demonstrated twice in one session — once against a real `reset` whose stdout landed inside a finding's title via a backticked `--title` argument, the other silently dropping a word from a heading the same way.

# Evidence

Project #17342, domain `message`, status someday_maybe, live-on deploy. Captured, not defined — no objective written.

Captured from `#17314`'s purge work, filed under Safety: a guard against destroying a peer's work observed failing open. Two instances, same session, both mine. Demonstration: same shell, same repo, a read-only blocklisted git operation, safe either way — typed directly, `block-destructive-git.sh` refused it; the same operation inside a command substitution, inside an unrelated command's argument, ran.

A destructive operation already went through it for real: an open `exit-codes-and-output-channels` entry has git's own stdout — `Unstaged changes after reset:` — embedded in its heading, because filing through `--title` executed a backticked remedy and substituted its output in. Nothing was staged, so nothing was lost — timing, not design. Earlier the same session, backticks in `--title` silently dropped a heading word, caught only by re-reading the landed text.

Severity: the corpus likeliest to carry backticked git commands is the findings corpus, since a finding about a broken command quotes it. The guard fails in the concealing direction: a blocked one announces itself, a slipped one says nothing, so ordinary use never surfaces it; two found is a lower bound.

Filing this was refused twice, since the evidence names the blocked operations: the visible failure is the harmless one (prose refused); the harmful one (substitution) says nothing.

Two remedies, not alternatives: the guard must see into command substitutions (it splits on pipe-style boundaries only), and command-shaped prose should not enter through a shell word (`--title-file` exists, isn't default). Widening only the pattern match worsens false positives while substitutions stay unseen.

Not a `#17314` child: that tree is deployed, all eleven children cleared; this is its own gap, found by the purge work over it.

Moved off the row's retired `notes` attribute on 2026-08-15.
