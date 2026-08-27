---
id: 24197114-0bb7-5518-9133-7b33abff9ce1
page-type-slug: finding
title: "Ephemeral answers behind ref"
domain-slug: domain/ops-cli
---

# Claim

`ops worktree ephemeral` answers at the source checkout's commit when the source is behind the ref you named, rather than refusing as it does for every other disagreement between the two.

# Evidence

The verb borrows the source checkout's `node_modules` by symlink, so both halves of the tree must name one commit. It therefore pins the throwaway tree at the SOURCE's HEAD rather than at the ref named by `--ref`. This is declared: the help says so in capitals, and `pinStatement` prints the commit it measured at on every run.

WHAT IT REFUSES AND WHAT IT DOES NOT. A source that is dirty, ahead of the ref, or on a branch off the ref's history exits 3 rather than handing back a tree that exists nowhere. A source that is merely BEHIND the ref does not refuse — the help states it "is answered at the source's own commit". So the one disagreement that is silently tolerated is the one a seat is most likely to have, since `~/code` follows main by whoever last pulled it.

WHY THAT MATTERS MORE THAN THE OTHER THREE. The reading comes back looking like an ordinary answer about the ref you named: normal exit code, normal check output, and only a stderr line saying which commit it actually measured. A seat asking "is main green?" from a `~/code` a few commits back is answered about a tree that is not main, in the same shape as a true answer.

REPORTED as a silent trap by #19097's seat on 2026-08-14, in the form "it pins to the source's HEAD rather than the ref you name, so a seat whose `~/code` was behind would measure a tree without the fix and report main still red". Checked against the source rather than taken: the pin is real and the scenario holds, but it is announced rather than silent — `--ref`'s own help states the constraint and every run prints what it measured. The gap is between a printed statement and an exit code, not an undocumented behaviour.

DISTINCT FROM `pages/finding/ops-cli/ephemeral-worktree-distorts-ast-unused.finding.md`, which is about reaches resolving through `codeRoot()` and needs a different repair.
