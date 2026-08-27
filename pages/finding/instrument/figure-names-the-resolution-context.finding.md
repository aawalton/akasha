---
id: b488d027-a2b7-52e4-9182-6a19c130b96d
page-type-slug: finding
title: "Figure names the resolution context"
domain-slug: domain/instrument
---

# Claim

A figure an instrument prints can name the population it resolved AGAINST rather than the one it judged; the two look identical in the output. `check-repo-paths` prints `instruction tree: 292 files` — its resolution context, not its carrier set — so the check whose name most sounds like it would catch a bad path citation in an instructions surface reads as covering 292 files it does not carry. Negative Control, Population and Horizon on `domains/instrument.md` are none of them this.

# Evidence

From a standing ruling of 2026-07-28 in `dirty/skills/agent-harness/rulings/surfaces.md`, emptied by an ingest seat. Filed because the ruling's machinery has since changed while this half of it did not.

WHAT CHANGED. Its other named check, `check-doctrine-path-citations`, is no longer a check: `packages/infra/checks/src/lib/check-configs-citations.ts` records its retirement at #17875 — its corpus is `public.pages` rows written out of band, "so a citation rots with no commit anywhere". The reading survives as `ops audit doctrine-path-citations`. `check-instructions-citations` now stands in that file and asserts DIRECTION rather than resolution.

WHY THIS HALF SURVIVES ITS OWN REPAIR. Population says to state the population size where an instrument reports. It is SATISFIED here — the figure is printed — and the reader is misled anyway, because the number names the set the instrument may resolve against rather than the set it examines. An absent figure and a figure of the wrong population are different faults; `pages/finding/instrument/census-drops-a-population-without-a-figure.finding.md` is the first.

A LIVE INSTANCE, IN THE INSTRUMENT I BUILT TO TEST THIS. My probe printed `EMPTY! 0` against five `code-path:` declarations. None is empty: my regex took a single-line value, and those five declare a YAML list or a quoted `"**"`. The zero named my parser's reach and read as the estate's emptiness.

WHAT I MEASURED, which is why no defect is filed beside this. Over 295 live `.md` files excluding `dirty/`: one `packages/` prose citation, resolving; eight bare `tools/` or `domains/` citations outside markdown links, all resolving; every resolvable `code-path:` glob non-empty. `tools/gates/links-resolve.ts` covers markdown links and anchors and skips all else, so a bare prose path here is gated by nothing — a structural gap with no occupants.

Kin: `pages/finding/instrument/gate-subject-causes-its-population.finding.md`, from the sibling ruling file, is about an instrument being a CAUSE of what it reads.
