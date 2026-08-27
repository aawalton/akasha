---
id: 7cc64f7f-bd88-5336-89f1-cc25d2689451
page-type-slug: finding
title: "Pgrep pattern matches the asker"
domain-slug: domain/instrument
---

# Claim

`pgrep -f` and `pkill -f` match against `/proc/<pid>/cmdline`, which holds neither a process's working directory nor the shell that launched it — and which, for the asking process, holds the pattern itself. So the check reports a false positive when the pattern names the command the agent is running, and a false negative when it names anything outside the target's cmdline. Both directions return the shape of a clean answer.

# Evidence

Three instances on 2026-08-05, in three separate seats, two of them self-reported.

FALSE NEGATIVE. A seat launched a reproduction harness as `cd /tmp/oomrepro && bun upstream.ts`, so `/tmp/oomrepro` appeared only in the process's CWD and never in its cmdline, which read `bun upstream.ts`. Its cleanup ran `pkill -f oomrepro` and verified with `pgrep -f oomrepro`. Both reported nothing while PID 1241768 was alive and listening on 127.0.0.1:3102. The process survived the seat's own verified cleanup and was still running about seven hours later. The tell was `(deleted)` on its `/proc/<pid>/cwd`, the directory having been removed out from under it.

FALSE POSITIVE. A different seat armed a liveness probe as `pgrep -f "ops project deploy --seq 17880"`. The pattern was a substring of the probe's own command line, so the probe matched itself. It could only ever report "still running", and would have done so after the deploy finished, failed, or never started.

FALSE POSITIVE, second form. Verifying the first seat's cleanup, `pgrep -af "bun upstream"` returned one match: the bash wrapper evaluating that pgrep, whose cmdline carried the pattern as an argument. The real process was by then gone, so the instrument reported a live process where none existed.

The two directions compose badly. The false negative hides a process from the agent that owns it; the false positive hides its absence. Neither raises an error, neither returns empty in a way that looks wrong, and the false negative in particular is indistinguishable from a successful cleanup.

Not measured: how many seats use `-f` patterns this way, and whether any standing instrument in the estate is built on one.
