---
id: cb230dcf-73f2-5225-91a4-460b9b5cddad
page-type-slug: ops-command
title: "Ops chess evaluate"
slug: ops-chess-evaluate
domain-parent-slug: domain/ops-chess
required-reading-slugs:
  - page-type/ops-command
command-path: tools/commands/chess/evaluate.ts
path: chess evaluate
---

# Definition

- **Ops chess evaluate** — a position's score, best move and principal variation from the engine at a chosen depth.

# Help

Evaluate a position with the self-hosted Stockfish engine: centipawn/mate score, best move, and principal variation.

Score is reported from White's perspective (positive favors White). A deterministic engine eval — no invented numbers.
