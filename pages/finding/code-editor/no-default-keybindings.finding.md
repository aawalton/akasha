---
id: 77be4ee2-86f9-528b-a294-d2d7f400a2db
page-type-slug: finding
title: "No default keybindings"
domain-slug: domain/code-editor
---

# Claim

The editor ships no default keybindings of its own, so a key Alan relies on is carried only by whichever user-data profile he happens to be running.

# Evidence

Alan reported on 2026-08-10 that Shift+Enter inserted no newline in the desktop application, and did in VS Code. The cause is one file. `~/.config/Code/User/keybindings.json` holds a single binding — `shift+enter` sending an escape then a carriage return to a terminal under `terminalFocus`, written by `claude /terminal-setup` on 2026-05-31. Every user-data directory this editor uses held no such file: `~/.config/code-oss-dev/User`, which the running desktop build was verified to hold open, and both `~/.openvscode-server/data/User` and `~/.openvscode-server-dev/data/User` for the served cuts. Copying the binding into the first repaired it, confirmed by him at the terminal.

So the repair is per-profile, and there are three profiles. The served cuts still have no binding, and a fourth profile — a new machine, a cleared data directory, a second served instance — starts without one again.

What makes this quiet rather than merely missing is the shape of the failure. The key does nothing visible: Enter submits, Shift+Enter submits, and there is no error and no unbound-key notice to read. It presents as the agent behaving oddly rather than as the editor lacking a binding, and the reader most likely to hit it is Alan mid-sentence.

This sits under the initiative objective that everything he relies on works in the desktop application. A binding shipped in the fork's own defaults would hold across every profile and every cut; a file in one profile holds until that profile is replaced.
