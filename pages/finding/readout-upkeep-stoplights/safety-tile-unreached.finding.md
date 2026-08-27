---
id: a069d25a-41ee-5cbd-930c-25420ebaa42f
page-type-slug: finding
title: "Safety tile unreached"
domain-slug: domain/global
---

# Claim

Safety now draws on a tile of its own on both phones, and no Design line on `domains/readout-upkeep-stoplights.md` reaches that tile. Two of the domain's five `code-path:` entries are the tile's files, so the domain governs it while saying nothing about it.

# Evidence

Raised by the reviewer seat `claude-readout-upkeep-stoplights-archivist-review-instructions` on 2026-08-13; its report is at `~/agents/claude-readout-upkeep-stoplights-archivist-review-instructions/review-readout-upkeep-stoplights.md`.

That seat ran `ls` over each of the five `code-path:` globs and confirmed all five resolve, and read both `SafetyLevelWidget.swift` files while testing the `packages/*/` glob against `domains/domain.md#path-globs`. It found the domain's area genuinely is that set of files, which is what makes the silence a gap rather than an over-broad glob.

It did not add a line, a Design entry being reserved to Alan by `domains/domain.md#every-changed-line`.

I did not read either widget file or re-run the glob resolution.

Not measured: what a Design line about the tile would have to say — whether the tile is a departure a reader would otherwise undo, or simply a surface the domain covers without needing a line.
