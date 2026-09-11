import type { Finding } from "akasha/domains/findings/finding.page-type.types.ts"

export const theLinterReadsItsConfigOffDiskRatherThanFromTheChange = {
  id: "01a08e77-1990-76ee-b4dd-a0d479a71302",
  pageTypeSlug: "finding",
  type: "finding",
  slug: "the-linter-reads-its-config-off-disk-rather-than-from-the-change",
  domain: "domain/check",
  claim:
    "A change is judged before the change reaches disk, so the lint check mirrors the bodies it judges out of the change. The two files that say how to judge them — `biome.json` and `.gitignore` — are copied from the working tree instead. A change turning either one is therefore judged under the old one, and the change lands having never been read against the rules it sets. The same `biome.json` is read both ways inside one check: through the change to pick which files to carry, off disk to hand to the tool. The mirror module states the copying as its own departure, so the reading is chosen rather than slipped in.",
  evidence:
    "`checks/modules/change-mirror/change-mirror.module.code.ts:22-43` holds two loops with two sources. The first, line 30-31, is `for (const one of paths)` with `const bytes = reaching(one, () => at(one))`, where `at` is the change's body reader. The second, lines 39-42, is `for (const one of also)` with `const there = join(from, one)`, `if (!existsSync(there)) continue` and `reaching(one, () => cpSync(there, join(root, one)))`, where `from` is the working-tree root. The module's own page says so at `checks/modules/change-mirror/change-mirror.module.ts:22` — 'A file the caller also names is copied from the tree the mirror is made from.' At the call site, `checks/code-checks/pages/lint-clean/lint-clean.code-check.check.code.ts:31` is `const mirror = mirroredOf(change.root, carried, change.after, CONFIGURED)`, with `CONFIGURED` at line 18 holding `CONFIG` and `IGNORE` — `biome.json` and `.gitignore`, named at `lint-clean.code-check.decision.code.ts:5` and `:16`. Four lines earlier, line 27 is `const said = change.after(CONFIG)`, the same file read through the change to decide what to carry. `pages/change/change.module.code.ts:1-6` has `root` as the repository root and `after` as the change's body reader. `checks/check.domain.ts:34` states 'A change is judged before the change reaches disk.', so the copy taken off disk is the body from before the change. The other caller is unaffected: `checks/code-checks/pages/shell-clean/shell-clean.code-check.decision.code.ts:131` hands an empty list.",
} as const satisfies Finding
