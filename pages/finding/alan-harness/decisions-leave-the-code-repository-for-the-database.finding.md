---
id: d0e58b1a-48fb-5817-910d-778add3a7eb9
page-type-slug: finding
title: "Decisions leave the code repository for the database"
domain-slug: domain/alan-harness
---

# Claim

Decisions about what Alan's readings mean are being moved out of source into database rows, deliberately, each move written up as an improvement. The destination version-controls nothing. Roughly 6-8% of the alan-harness code surface is decision-bearing, and the share of it reachable by reading either repository is falling.

# Evidence

Verified by me, 2026-08-11, except where marked.

**Three sites, each stating the move as a virtue.**

    daily-tracking/src/completion-points.ts:30
      "Each persona's green-day bar (`greenDayPoints`) lives as DATA on her page, read here
       per run — never hardcoded — so a recalibration is a data edit, not a code change."

    daily-tracking/src/sleep-title-words.ts:4
      "Both lists are data on Ione's persona page rather than constants here, so changing
       which titles count is an `ops page update` and takes effect on the next read."

    personas/core/src/daily-tier.ts:89
      "SOURCE OF TRUTH: the `faithLevel` and `learnLevel` formulas on the live
       `daily-tracking` page-type row."

Each is right about the convenience. A data edit beats a deploy, and the long path through CI is why they went.

**Evidence they drift.** A verb exists only to reconcile them: `ops persona faucet check` — "Read every persona's domain document against her persona row and report every disagreement about her green-day bar." Survey-reported; I did not run it.

**Size, approximate and survey-reported.** About 114,000 non-test lines of alan-harness surface, roughly 6-8% decision-bearing — call it 7,000 lines. Separating decision from effect is already done in code and done well; `status-bar-access/src/upkeep-stoplights.ts:13` states the split outright. What has not happened is the move to where a decision can be changed cheaply.

**What now stands against it.** `domains/global.md` gained File First on 2026-08-11. It previously stood on `agent-harness`, which `alan-harness` does not inherit, and `code-repo` reaches neither — so the rule had never reached a hand making these moves.
