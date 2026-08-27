---
id: 8cd2a525-0285-5fdd-b9f2-4d3019a40e59
slug: palette-written-four-ways
page-type-slug: finding
title: "One palette is written out in four notations across two repositories"
domain-slug: domain/design-tokens
---

# Claim

One palette of six colours is written out in four notations across two
repositories, and the check that held two of them together was reading a third
copy as its canonical.

# Evidence

The instructions repository states each colour once, as hex, at
`pages/color/<name>.color.md`: blue `#2c5a9d`, yellow `#b87b11`, orange `#be5a0a`,
purple `#7c4ca3`, green `#2d8c57`, red `#a51c32`.

Converting `shared/design-system/src/styles/tokens.css` from oklch to
sRGB gives those six back exactly, with no rounding disagreement in any channel:
`--green: oklch(0.57 0.12 155)` is `#2d8c57`, `--blue: oklch(0.47 0.12 258)` is
`#2c5a9d`, and so on for all six. It is the same palette in another notation
rather than a palette of its own.

`ios-widget/PipelineHealthWidget.swift` writes five of them a third way, as
decimal thirds: `Color(red: 44 / 255, green: 90 / 255, blue: 157 / 255)` is
`#2c5a9d`. It is the only Swift file in the repository doing this.

`packages/shared/project-status/src/index.ts` held all seven a fourth way, and
that copy was what `check-widget-bucket-color-mirror` read as canonical when
holding the Swift file honest. It never compared the Swift against the
stylesheet or against the instructions repository; it compared one code-repo
copy to another. Both were removed on 2026-08-22, so nothing now holds those
five decimal triples to anything. That is a cost of the removal, stated here
rather than left to be found.

`NAV_ICON_ACCENT = "oklch(0.63 0.13 73)"` is declared in four separate
`nav-icon-svg.ts` files, each a copy of `--yellow` from the stylesheet beside
it. Three are byte-identical over all 60 lines; the fourth differs in one
`stroke-width`.

The allowlist at `infra/cluster-checks/src/lib/color-literal-grants.ts` grants each site its
literal by path, so the count of grants is a count of copies. A gate reporting
no violation reports that every copy is one somebody allowed, not that there
are few.
