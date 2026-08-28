---
page-type-slug: finding
slug: one-window-subtree-left-its-sidecars
title: "Eleven uncommitted sidecars have no page beside them, and all eleven are one window's subtree written in the same two milliseconds"
domain-slug: domain/page-storage-uncommitted
---

# Claim

Eleven `.uncommitted.yaml` files stand in akasha with no page beside them, and all eleven are one code-editor window's subtree: the window `457299-17999629`, its single group `457299-17999629-1`, and that group's nine tabs. Every one was written inside the same two milliseconds.

`pages/domain/page-storage-uncommitted.domain.md:33` states that an uncommitted file goes when its page goes. These did not. Because an uncommitted file is gitignored, no gate, no commit and no link check reaches one, so nothing reports them.

This is one event rather than an accumulation. The other 505 sidecars in the repository each stand beside their page, and `code-editor-terminal` — a fourth page type of the same family — holds fifteen pages and no sidecar at all.

What removed the eleven pages without their sidecars is not established.

# Evidence

Measured 2026-08-28 at `6df3bab03` on this workstation, over the akasha checkout. `/var/home/walton/repos` holds `akasha` and `code-editor` and nothing else, so akasha is the whole population for this reading.

`find . -name '*.uncommitted.yaml'` outside `node_modules/` and `.git/` returns **516** files. Pairing each against the `<stem>.md` its name implies leaves **11** with no page:

    pages/code-editor-window/457299-17999629.code-editor-window.uncommitted.yaml
    pages/code-editor-group/457299-17999629-1.code-editor-group.uncommitted.yaml
    pages/code-editor-group-tab/457299-17999629-1-1 … -1-9 (nine files)

By page type, orphans against live pages and total sidecars: `code-editor-group-tab` 9 of 24, against 15 pages; `code-editor-group` 1 of 3, against 2 pages; `code-editor-window` 1 of 2, against 1 page. `code-editor-terminal` holds 15 pages and 0 sidecars.

ONE EVENT, NOT AN ACCUMULATION. Modification times run from `11:22:25.599739495` to `11:22:25.601234482` on 2026-08-27 — a span of about 1.5 milliseconds across all eleven files. A window, its group and its nine tabs went together.

POSITIVE CONTROL ON THE PAIRING TEST. `agent/seat/ki.seat.uncommitted.yaml` has a page beside it and is correctly excluded from the orphan list, so the zeros for every other page type are real zeros rather than a test that cannot fire. This control was worth running: an earlier pass over this same population tested for `<stem>.*.md` rather than `<stem>.md`, matched nothing anywhere, and reported all 516 files as orphans — a clean, plausible figure produced entirely by a wrong glob.

Not measured: what writes or removes these page types, so the mechanism that left the eleven behind is unidentified. Not measured: whether the eleven pages ever stood on disk, or whether the sidecars were written for pages that were never created — the sidecar is gitignored, so git holds no record either way.
