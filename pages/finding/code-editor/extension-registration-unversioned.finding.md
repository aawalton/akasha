---
id: 722d4a8a-e02f-5d18-9ac3-8776af636835
slug: extension-registration-unversioned
page-type-slug: finding
title: "Extension registration unversioned"
domain-slug: domain/code-editor
---

# Claim

The record binding an extension to the editor lives only in the editor's own data folder, so anything that clears that folder unregisters the extension without saying so, and the editor afterwards presents as one that simply has no such extension.

# Evidence

`alanwalton.ops` is installed into the code editor the way desktop VS Code installs it: not copied, but registered in place. The registry entry names the folder in the monorepo, so one compile serves both editors and neither can hold stale bytes.

That entry is a single line in `~/.openvscode-server-dev/extensions/extensions.json`, written 2026-08-09, and it is the whole of what makes the extension exist for this editor. The folder it points at is in a repository; the pointer is not. Nothing else on disk records that the editor is supposed to load it, so if the data folder is cleared — which is the ordinary remedy for a wedged workbench, and was the remedy applied to browser storage on 2026-08-09 — the extension is gone and no error is raised. The editor starts clean, serves 200 and shows a status bar with nothing in it, which is also what it shows while still loading.

The same edit could not be made from inside the editor. `Developer: Install Extension from Location...` is registered in this fork and runs, then fails with `Local extension management server is not found`: the workbench is web, and the command's install path resolves the local extension management server, which a browser workbench does not have. So the registration cannot be restored by the route a person would reach for, only by writing that file.

This is the shape already recorded at `pages/finding/code-editor/workspace-trust-disables-disk-settings.finding.md`: state held somewhere unversioned, whose absence reads as an editor working normally rather than as a setting lost.
