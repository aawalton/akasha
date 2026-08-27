---
id: edac3989-b1df-5c34-9ba6-e584507a3afa
page-type-slug: old-ops-command
title: "Ops chess play"
slug: ops-chess-play
domain-parent-slug: domain/ops-chess
required-reading-slugs:
  - page-type/old-ops-command
command-path: tools/commands/chess/play.ts
path: chess play
---

# Definition

- **Ops chess play** — the engine's own reply from one position at a chosen strength, and the position it leaves.

# Help

Have the self-hosted Stockfish engine choose a reply move at a target strength, then report the resulting position.

Strength is set by EITHER --level (Skill Level 0–20) OR --elo (1320–3190 via UCI_LimitStrength). Default: --level 20 (full strength).
