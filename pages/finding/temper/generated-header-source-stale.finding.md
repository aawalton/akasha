---
id: 7799b4c5-6c80-5d1b-bcb7-45adfb3161e0
slug: generated-header-source-stale
page-type-slug: finding
title: "Generated header source stale"
domain-slug: domain/temper
---

# Claim

31 `Source:`-family path clauses in `.generated.ts` header comments across `packages/temper/scripts/src/generate-addon-data/`'s output are stale, pointing at a non-existent `engine/` root instead of the real `packages/temper/game/…` paths, and there is no stated repo convention for what such a clause should contain.

# Evidence

From project #16018 (domain `temper`, status `someday_maybe`, captured 2026-07-25, never given an objective). Surfaced by the worker on #16011, asked to check a generated header's other clauses; they were not right, via the same emitter mechanism as the command-string defect #16011 fixed.

Representative header, `packages/temper/game/characters/capture/addon/src/generated/alliance-mappings.generated.ts:1-8`, claims `Source: engine/character/alliances-data.ts`. There is no `engine/` root in the repo (`ls -d engine packages` confirms `engine` absent, `packages` present). The real file is `packages/temper/game/characters/character/src/alliances-data.ts`.

Scale: a first grep (`Source: ` prefix only) missed 3 clauses that wrap across lines. The complete reader finds 31 path-bearing lines across 16 `.generated.ts` files in 5 `src/generated/` dirs, all carrying the same stale `engine/…` text, self-worsening on every regeneration.

Resolution: 25 of 31 import-verified (import to package.json name match to directory to basename, a 4-link chain), 5 basename-only unproven (the `rule-*` generators emit hand-written templates with nothing to verify against), 0 unresolved.

Three traps making a blind `engine/` substitution wrong: (1) `race-mappings.ts:18`'s named source `races-data.ts` is absent repo-wide; the real import chain lands on a generated file, not a hand file. (2) `class-mappings.ts:18` and `skill-line-mappings.ts:99` name the wrong package tier, not just the wrong prefix. (3) `companion-build-codec-v48.ts`/`-indices.ts` were renamed, not moved — real files dropped the `build-` segment.

Open decision, unresolved: no stated convention for what a `Source:` clause should hold, and the repo's only two data points disagree — `scribing-total-script-count.generated.ts:5` uses a package-specifier form (the only accurate clause in the repo); `chatter-names.generated.ts:4` uses a package-root-relative path. Capture was cut before resolving which form to adopt.
