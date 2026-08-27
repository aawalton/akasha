---
id: c77f6683-5026-588b-a1d2-916ddb8f2d8f
slug: sweep-skip-reads-as-a-pass
page-type-slug: finding
title: "Sweep skip reads as a pass"
domain-slug: domain/alan-harness
---

# Claim

The post-land simulator sweep's held-window skip is indistinguishable from a passing run — exit 0, no alert, one log line — so a native-shell land that was never verified reports exactly what a verified one reports.

# Evidence

The sweep refuses to sync `origin/main` over a macbook checkout it reads as dirty, on the ground that an in-flight branch build holds the window. That refusal is correct in itself. What it leaves behind is the defect.

Observed 2026-08-06 while landing #18033. `/tmp/shell-suite-postland-18033.log`:

    [sweep] #18033 post-land: mac/sim build window held — skipping install+suite
    (exit 0, no alert): mac checkout has 1 uncommitted tracked change(s) — an
    in-flight branch build holds the window; refusing to sync origin/main over it

Exit 0 and no alert are both deliberate — `--alert-to` fires on a regression, and a run that never happened has no regression to report. The consequence is that the caller reading the exit code is told the sweep passed.

How long that stood is now measurable, because the state that held it has been cleared. The macbook's checkout carried a hand-copy of the #17545 widget change, which reached `main` in `ae6d009b62` on 2026-08-02. Every native-shell land between then and 2026-08-06 took the same silent skip — at least four days of lands reporting a verification nobody ran.

The guard also cannot part a held window from an abandoned one, because an in-flight edit and a forgotten copy are the same artifact seen at different times. That is why the state persisted: each land read it as somebody's live work and stood down, and standing down left no signal that would prompt anyone to check.

The tree was cleared on 2026-08-06 after every file in it was shown recoverable from `main` or its history, so the specific block is gone. The class is not: the next held window will skip just as silently, and nothing will say so.

`pages/finding/ios-install/untracked-blocks-merge.finding.md` holds the separate defect in the same guard's model of what blocks a merge. `#18039` holds the design that removes the contention rather than arbitrating it.

Filed after clearing the state a prior finding here reported, whose claim stopped being true with it and which went in the same pass.
