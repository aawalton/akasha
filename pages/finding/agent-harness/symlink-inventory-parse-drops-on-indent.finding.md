---
id: 0d3f01ac-1b77-546d-84db-487a71109c44
slug: symlink-inventory-parse-drops-on-indent
page-type-slug: finding
title: "Symlink inventory parse drops on indent"
domain-slug: domain/agent-harness
---

# Claim

`parseDeclaredLinks` drops a `link` declaration that stops matching its pattern one line before the arm built to stop the denominator shrinking silently. Indenting the installer's 8 column-0 declarations takes the inventory from 38 to 30 while the 30 gated ones keep matching, so the scan reports a smaller population, a clean verdict and no signal. What stands between the two is a comment in the shell file.

# Evidence

Measured 2026-08-07 in `~/code` at `ecf5f9518`, running the parser's own pattern over the file it parses.

THE PATTERN. `packages/shared/utils/system/src/symlink-integrity-decide.ts:36`: `const LINK_CALL_RE = /(?:^|[|&;]\s*)link\s+"([^"]+)"\s+"([^"]+)"/`. It admits `link` at start-of-line or after `[|&;]\s*`. Leading whitespace satisfies neither branch, so an indented bare declaration falls out — while an indented GATED one still matches, the `||` or `&&` before it satisfying the second branch.

THE NUMBERS. Over `packages/shared/dotfiles/setup-symlinks.sh`: 38 lines match today, 8 of them bare at column 0. Prefixing every line with two spaces leaves 30. Nothing else changes.

WHERE IT IS LOST. `parseDeclaredLinks` loops per line and opens with `if (!LINK_CALL_RE.test(line)) continue`. The `unexaminable` list — whose whole purpose the file states at `:69-70` ("a numerator over an unstated denominator supports no claim") and again at `:86` ("Dropping it shrinks the denominator with no signal, so the scan would answer a question about a smaller inventory than the script declares while looking exactly like a scan that covered all of it") — is reached one line later. So the hazard the instrument names for the unexpandable-variable case is unguarded for the case one line above it.

WHAT GUARDS IT TODAY. A comment, in the file being parsed: `setup-symlinks.sh:14-18` says the calls below stay at column 0 because two parsers read this file as the canonical inventory and need a bare call to start the line, and that indenting one makes it invisible without shrinking the count reported clean. A second at `:158-160` guards variable expansion. Prose, against a formatting edit.

WHAT THIS ADDS TO THE STANDING SIBLING. `pages/finding/agent-harness/account-skills-links-outlive-retirement.finding.md` records that the denominator is exactly what the script declares, so links never declared are invisible. That is the inventory's SCOPE. This is its PARSE: declarations already inside the file, leaving the denominator on a whitespace change.
