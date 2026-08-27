---
id: 9619e144-d053-5819-8db8-4c78ed5dbf9e
slug: motif-fields-misnamed
page-type-slug: finding
title: "Motif fields misnamed"
domain-slug: ops-command/ops-temper-inventory-lookup-item
---

# Claim

`ops temper inventory lookup-item` documents two output fields it has never emitted: its help at `pages/old-ops-command/ops-temper-inventory-lookup-item.old-ops-command.md:34-39` names `motifCollection` and `motifBook`, and the body at `tools/commands/temper/inventory/lookup-item.ts:114-139` writes `motifStyleId` and `motifChapterId`, in both the TSV and the `--json` shape.

# Evidence

The help block's stdout sketch carries `motifCollection\t<n>` and `motifBook\t<n>` under "only for motif", and repeats both names in the `--json` shape a caller is told it "may depend on". `buildTsv` pushes `motifStyleId` and `motifChapterId`; `buildJson` returns `motifStyleId` and `motifChapterId`, the latter as `"master"` where the chapter is null. `tools/tests/ops-temper-inventory-lookup-item.on-demand.test.ts:127-128` asserts `motifStyleId` and `motifChapterId` in the TSV and `:147-148` asserts the `--json` object whole, admitting no unmodelled key, so the emitted names are the ones under test and the documented names are the ones under nothing.

The disagreement predates the move of this body into akasha and was carried across unchanged, the help block being left exactly as it stood so that a change made while moving could not be told from the move.

Which side is wrong is not settled here. The names in the help read as the older pair — `collection` and `book` are the lore-library coordinates — and the emitted pair reads as the later rename to style and chapter. A caller who wrote against the help has been reading empty fields for as long as both have stood.
