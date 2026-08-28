---
page-type-slug: finding
title: "Mv leaves the directory it emptied"
domain-slug: command/mv
---

# Claim

`ops mv` leaves the source directory standing once it has carried the last file out of it, and
says nothing about doing so. `ops rm` states the opposite rule for itself, in one line of its own
document: "A directory the removal leaves empty goes with it." Both commands take a path away from
where it stood, so a reader who has read one is entitled to expect the other to behave the same
way, and nothing in `ops mv`'s document corrects that expectation.

What the difference costs is not the empty directory. It is that a caller who checks its own work
with `ls` sees the folder it just emptied still there, reads the move as having failed or half
landed, and reaches for a second act to finish it. The directory is untracked, so no `ops` command
has anything to commit and the only tool that removes it is a bare `rmdir` — a filesystem change
outside the one write path, made by a caller who was trying to be careful.

# Evidence

Measured 2026-08-28 in `/var/home/walton/repos/akasha`.

THE TWO DOCUMENTS. `ops-cli/global/rm/rm.command.md:28` reads, whole: "A directory the removal
leaves empty goes with it." `ops-cli/global/mv/mv.command.md` carries no line about the directory a
move empties: `grep -ci empty` over it returns 0. Its long passage on directories governs `--from`
naming one and what `--to` must not be, and stops there.

REPRODUCED, THREE TIMES, FROM ORDINARY USE. Commit `85817df2b` moved four findings out of three
folders with `ops mv`, one file at a time. After it landed, all three source folders stood on disk
holding nothing: `pages/finding/alan-harness-stoplights-upkeep/`,
`pages/finding/alan-harness-stoplights-values/` and `pages/finding/readout-display-categorize/`,
each `ls -A` empty and each with 0 paths under it in `git ls-files`. They stand there still.

THE SAME SHAPE REACHED ANOTHER CALLER INDEPENDENTLY. Commits `d072bbbcf` and `8172bd6ad` emptied
`pages/finding/check/`, `pages/finding/code-repo/` and `pages/finding/instructions-repo/` the same
way. The caller checking its work found all three still listed by `ls`, and removed them with
`rmdir` — the bare shell tool, no `ops` command having a tracked path to commit.

Not measured: whether `ops mv` should remove the emptied directory or `ops rm` should stop promising
to, and whether any caller depends on the source directory surviving a move.
