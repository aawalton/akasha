---
id: e704027f-419f-5db7-9f2a-f4401d9b67b8
page-type-slug: domain
title: "Seat tmux session"
slug: seat-tmux-session
domain-parent-slug: page-type/seat
---

# Definition

- **Seat tmux session** — the tmux session a seat runs in.

# Design

The session name is the seat name.

The tmux client is a child of the shell in the tab it was attached from; the server is not.

The server runs under a `systemd-run` user scope rather than under the terminal that started it.

The agent's process runs with `TMUX` and `TMUX_PANE` unset.

The status bar is off.
