---
id: c71d84f9-8d31-584f-a06c-9fda0b345937
page-type-slug: finding
title: "No ops path clears the directory mv empties"
domain-slug: domain/ops-global
---

# Claim

`ops mv` leaves the source directory standing once it carries the last file out of it, and
`ops rm` then REFUSES to take that directory away, because git holds no file under it. So one
write-path command creates a state the other write-path command will not resolve, and no `ops`
path closes it at all. The only tool that removes the husk is a bare `rmdir`, which is a
filesystem mutation outside the one write path.

That is the sharp part, rather than the untidiness. One Write Path says every write goes through
`ops`. Here obeying it is impossible: an agent that moved a folder's last file and checks its own
work finds the folder still listed, has no `ops` command that will clear it, and finishes the job
only by breaking the rule it was keeping. Three seats reached that same `rmdir` in one night,
independently, and each flagged it rather than wanting it.

# Evidence

Measured 2026-08-28 in `/var/home/walton/repos/akasha`.

THE TWO HELP TEXTS. `ops rm --help` promises, verbatim: "a directory the removal leaves empty goes
too, git holding no empty directory." `ops mv --help` opens "Move files, repoint everything that
named them, and remove the orphans" and makes no such promise about the directory it empties;
`ops mv --help | grep -ci empty` returns 0, against 1 for `ops rm --help`. The only sentence in
`ops mv --help` bearing on an empty directory governs the other direction — "a directory holding
nothing else is refused" — which is about what a `--from` expansion may take, not about what the
move leaves behind. The same asymmetry stands in the command documents:
`ops-cli/global/rm/rm.command.md:28` reads "A directory the removal leaves empty goes with it."
and `ops-cli/global/mv/mv.command.md` carries no counterpart.

THE REFUSAL, VERBATIM. Run against a directory `ops mv` had just emptied:

    error: pages/finding/page-type-backing-file-large is a directory git holds no file under — a removal takes what the repo holds, so this would take nothing

It is not particular to that path. Reproduced on a directory made fresh and holding nothing:
`mkdir -p pages/finding/zz-husk-probe-2026-08-28 && ops rm pages/finding/zz-husk-probe-2026-08-28 --dry-run`
exits 1 with the same sentence. The probe directory was removed again and left no residue.

WHERE THIS SEAT MET IT. Commits `9945ae4e3`, `7f9778284` and `3f6ac2660` moved 15 findings out of
three folders with `ops mv`, one `--from`/`--to` pair at a time. After they landed, all three
source folders stood on disk holding nothing — `pages/finding/page-type-backing-file/`,
`pages/finding/page-type-backing-file-data/` and `pages/finding/page-type-backing-file-large/` —
each `ls -A` empty and each with 0 paths under it in `git ls-files`. `ops rm` refused all three.
They were cleared with `rmdir`, which is guarded by construction, failing rather than sweeping if
anything is inside. No commit resulted, git holding no empty directory to commit.

ALREADY FILED FOR THE COMMAND ITSELF.
`pages/finding/mv/mv-leaves-the-directory-it-emptied.finding.md` records the same husk keyed to
`command/mv`, with two earlier callers: commit `85817df2b`, which left
`pages/finding/alan-harness-stoplights-upkeep/`, `pages/finding/alan-harness-stoplights-values/`
and `pages/finding/readout-display-categorize/` standing, and commits `d072bbbcf` and `8172bd6ad`,
which emptied `pages/finding/check/`, `pages/finding/code-repo/` and
`pages/finding/instructions-repo/`. This finding is filed beside it rather than over it, because
its claim is different: that one records `ops mv`'s silence, and does not carry the `ops rm`
refusal, which is what makes the state unresolvable rather than merely undocumented. Read
together they are three independent callers on one night.

WHAT WOULD SHOW IT FIXED. Either half closes it, and both are one command to check.
`mkdir -p pages/finding/zz-husk-probe && ops rm pages/finding/zz-husk-probe --dry-run` exits 0
rather than 1; or `ops mv` carries a folder's last tracked file out and `ls -d` on the source then
answers "No such file or directory" with no second command run. Today the first exits 1 and the
second lists the folder.

Not established: whether the repair belongs to `ops mv` removing what it empties or to `ops rm`
accepting a directory git holds no file under, and whether any caller depends on a source
directory surviving a move. Both are rulings rather than patches, and nothing here settles either.
