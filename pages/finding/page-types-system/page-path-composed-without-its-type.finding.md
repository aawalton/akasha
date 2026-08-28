---
id: 8ba8d14b-1f1d-4e4f-b183-c548bc9037ce
slug: page-path-composed-without-its-type
page-type-slug: finding
title: "A composed page path drops the page type its name must carry"
domain-slug: domain/page-types-system
---

# Claim

Fifteen sites compose a page path ending `.<type>.md` and fourteen compose a bare `.md`, which names a file no page type claims. Most bare sites sit behind a disk lookup that falls through only when the page is absent — the create case, and the one a test with fixtures on disk never runs. `services/royal-road-sync.ts:209-213` records fifteen chapter pages landed untyped this way.

# Evidence

Surveyed 2026-08-28.

The split. Fifteen production sites compose `<dir>/<name>.<type>.md`, fourteen compose `<dir>/<name>.md`. Every page type involved globs `**/*.<type>.md` and none globs a bare `**/*.md`; every directory checked — `pages/refusal`, `pages/domain`, `pages/task`, `pages/repo`, `pages/claude-account`, `pages/workstation-service`, `agent/seat` — holds suffixed names only. The bare form names a file that stands nowhere.

Why it survives testing. Most bare sites read `pageFileIn(root, dir, slug) ?? <bare path>`. The lookup answers whenever the page exists, so the composed fallback is reached only when the file is absent. `tools/page/document/render.test.ts:31` went further: its stub matched `pages/refusal/x.md` under a root of `/root` that does not exist, so two assertions passed because of the defect and had to be changed with it.

The precedent. `services/royal-road-sync.ts:209-213` carries a comment recording that this composition landed fifteen chapter pages as untyped pages, invisible to the index and to every check, before anyone noticed.

Not every bare site is a fault. Where `pageFileIn` guards the compose, the fallback fires only when no file of that stem stands, so the outcome is unchanged and only the path named in the message differs. The faults are the sites that compose with no lookup at all, and the ones whose lookup and whose read consult different stores.
