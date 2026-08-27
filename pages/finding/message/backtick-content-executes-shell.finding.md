---
id: 543e2eed-dd0c-5947-a2b7-dbdb43aa4171
slug: backtick-content-executes-shell
page-type-slug: finding
title: "Backtick content executes shell"
domain-slug: page-type/message
---

# Claim

`bun ops seat send --content "..."` performs shell command substitution on backticks inside the double-quoted content before `ops` sees it, so an agent describing a shell command in prose executes that command on the workstation and the output is spliced into the message in place of the text the agent wrote — an author cannot tell this happened from the send succeeding, and the corruption is visible only to the recipient.

# Evidence

From project #16208 (`message`, `someday_maybe`, `live-on: deploy`), no objective — captured 2026-07-25, moved from retired `notes` 2026-08-15.

Mechanism: `bun ops seat send --content "...<backticked text>..."` is a shell invocation; bash performs command substitution on backticks inside the double-quoted string before `ops` sees it.

How it surfaced: #15808's worker wrote a report explaining its window detector was broken, quoting the two commands in backticks. `xwininfo -root -children` ran on the workstation, splicing Alan's whole live desktop window tree (102 children — ESO, both launchers, KWin, Xwayland, the 3440x1440 root window) into the report.

Escalated as a bright-line violation: nimue verified independently (DP-4 matching the root child; Steam live under Alan's user), halted all input injection, and demanded a display-provenance audit — feared alternative: a synthetic-input probe on Alan's primary-account game session. The worker's correction crossed the halt in flight, explaining it benignly; no probe touched his display.

Closed clean by structural clearance: no probe could reach Alan's display — all 16 on DISPLAY `:98`/`:99`/`:77` inside pod `args:`, none mounting `/tmp/.X11-unix` or using `hostNetwork`/`hostIPC`/`hostPID`; only hostPaths were `/dev/input`, `/dev/uinput`; every probe pinned to node-06, headless.

General form, worse than the instance: the substitution runs arbitrary shell from report prose — a report about a destructive command (`rm`, `kubectl delete`, `git`, `talosctl`) executes it. Not a discipline problem: nimue hit the identical trap hours earlier and independently adopted the same workaround (`--content-file`).

Candidate work, captured not scoped: (1) make `--content` safe by construction — the real fix; (2) refuse a `--content` with a backtick, directing to `--content-file` — cheap, not an alternative to (1); (3) document on the messaging surface. Encountered, not sought, by two agents doing unrelated work.
