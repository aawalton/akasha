---
id: f816c8fe-9a08-59fb-a496-142c2cacc443
page-type-slug: finding
title: "Royal road sync reads a directory the stories repo no longer has"
domain-slug: domain/royal-road
---

# Claim

`royal-road-sync` has failed on every run since the stories repository was restructured, because it reads `stories/read/royal-road/` and the repository now holds its story directories at its root.

# Evidence

Found on 2026-08-19 while sweeping every workstation unit for a non-success result, in the course of moving the services into `services/`. `systemctl --user list-units --failed` names `royal-road-sync.service`; its journal ends `ENOENT: no such file or directory, scandir '/var/home/walton/repos/stories/read/royal-road'`, thrown from `readStories`. `ls ~/repos/stories/` shows story directories directly under the root — `1-lifesteal`, `alexa-thyme`, `all-the-skills-a-deckbuilding-litrpg` and others — and no `read/` at all. The story directories carry an mtime of 2026-08-18 20:10, which is when the layout moved. Nothing in the sync was changed by the move into `services/`: the failing run predates it and its stack names the old `tools/` path.

Whether the sync should follow the new layout or the layout should carry a `read/` level is not settled here, and neither is what happened to whatever chapters the old path held.
