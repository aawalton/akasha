---
id: 96917ff3-f60a-5e4a-961a-19ca64d08cb6
page-type-slug: finding
title: "Two computer scores have never computed"
slug: two-computer-scores-have-never-computed
domain-slug: domain/page-property-computed
---

# Claim

Two computed properties on the `computer` page type have never computed. `computer-overall-performance-score` and `computer-server-score` name their inputs in camelCase where the page type declares kebab, so the deriver refuses both. A refused expression and an absent value read alike, so all 14 machines carry nothing under either key.

# Evidence

Measured 2026-08-28 against the working tree.

`pages/page-type/computer.page-type.md:22` states "Every score a machine carries is worked out from its parts rather than written down." That line has been false for every machine since it was written.

The deriver run over `computer` reports exactly two faults, and no other of the nine page types carrying an `expression:` reports any. Both read `states an \`expression\` this evaluator refuses: \`cpuScore\` is declared by no property on \`computer\``.

The pages spell kebab. `pages/computer/alans-pc.computer.md:9,13` carry `cpu-score: 57788` and `form-factor: desktop`, and all 14 `*.computer.md` files spell kebab throughout. The property definitions spell kebab too: `computer-cpu-score.page-property-definition.md:6` states `key: cpu-score`. Only the two expressions spell camelCase, so what is wrong is the expressions rather than the declarations.

Nothing folds one spelling into the other on this path. `tools/lib/page-derive.ts:102-109` matches a key exactly, and `:294-299` raises `unknown_key` for a name no property declares.

This is not the case recorded at `pages/finding/pages-system/camelcase-property-keys-match-their-sidecar-rows.finding.md`, where 42 camelCase keys are correct because the sidecar rows they describe spell the same. That covers three row-backed types. `computer` states `files: akasha:**/*.computer.md`, and its pages are files whose frontmatter spells kebab.

Both property definitions landed at `8ea6597345` (2026-08-27, "The pages land in akasha (batch 4)"), so the fault arrived with the migration into akasha rather than after it.

What a repair answers, run but not landed when this was written: with the references corrected and `storage-score` guarded against an absent `hdd`, all 14 machines compute, `alans-pc` answering 102272 for overall performance and 31224 for server score. Without that guard only 5 of the 14 compute, 8 machines carrying no `hdd`.

Not measured: whether anything reads either key.
