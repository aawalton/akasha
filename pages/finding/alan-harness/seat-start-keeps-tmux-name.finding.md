---
id: 42141b48-6d43-5232-98c0-7019889db236
slug: seat-start-keeps-tmux-name
page-type-slug: finding
title: "Only the sn launcher stops a tmux session holding a seat name; seat start refuses instead"
domain-slug: domain/alan-harness
---

# Claim

The Design entry "Starting a seat stops whatever tmux session already holds its name." is true of the `sn` launcher alone. `ops seat start` refuses a name any row already holds and mints nothing. `bun tools/seat.ts` refuses the whole statement where a live seat holds the spelling. `_aw_tmux_launch` attaches to a live session and kills only one whose panes are all dead. Only `seatNewFn("sn")` in `tools/aw/init/bash-tmux.ts` runs `has-session` and then `kill-session`.

# Evidence

Read off the `review-instructions` reading of `domains/alan-harness.md` finished 2026-08-21, read line by line, bottom to top. That reading reports running all four paths that start a seat rather than reading the code for them: `ops seat start --help`, `bun tools/seat.ts --help`, `_aw_tmux_launch`, and the rendering of `seatNewFn("sn")`.

The reading would have repaired the line to name `sn`, and did not land it, Design being a section "Every Changed Line" holds for Alan.

Not measured here: I did not run the four paths myself, and I did not look for a fifth. Whether the repair should name `sn` or the line should go is not settled here — a reader takes "seat start" first, which is the path the claim is false of.
