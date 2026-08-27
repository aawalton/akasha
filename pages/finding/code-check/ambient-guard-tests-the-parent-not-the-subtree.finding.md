---
id: 06d0753e-aada-56d9-9d9a-2ac2b4b28663
slug: ambient-guard-tests-the-parent-not-the-subtree
page-type-slug: finding
title: "Ambient guard tests the parent not the subtree"
domain-slug: domain/global
---

# Claim

Two addon checks guard their ambient type surface by testing that a PARENT directory exists. Moving the subtree that actually carries the declarations out from under it leaves the path resolving, the guard silent, and the coverage gone — while the run prints a full-looking denominator. #18724 repaired one of the two. The other still stands, and its own comment claims it fails loud.

# Evidence

`packages/infra/checks/src/checks/check-tstl-this-void-self-drop.ts:195-201`:

```ts
// Fail loud, not skip, if it stops existing: this is a committed tree, so
// absence means it moved and the `constructor`/`control-method` coverage silently
// vanished — exactly the reorg-drift class this project closes.
const typesAbs = join(repoRoot, AMBIENT_TYPES_REL)
if (!existsSync(typesAbs)) { throw new Error(...) }
```

The comment names the defect precisely and the code tests the wrong thing: `AMBIENT_TYPES_REL` is the PARENT. With `types/eso` moved out and `types/libs` left standing, `existsSync` is true, the guard is silent, and the base-game receiver surface is gone.

**#18724 measured exactly this on the sibling check** (`check-tstl-this-void-colon-method.ts`) and I confirmed the repair: that layout now exits 2, where the pre-repair check exits 0 printing `[over 49 of 49 addons]` — a full-looking denominator over a scan that had lost 42 files. The repair replaces the existence test with a refusal when the ambient root contributes no file to the selected set, which also catches the wholly-vanished-root case the old test caught (run both ways, exit 2 under both).

**The unrepaired check has a second half to the same row.** After #18724, the repaired sibling prints two bounds — `[over 49 of 49 addons] [over 88 of 88 base-game receiver-surface files]` — so a halving of the ambient half is visible on the line. `check-tstl-this-void-self-drop` still prints one: `[over 2227 of 2227 addon TypeScript files]`, which cannot show the ambient tree emptying.

#18725 landed two commits in that file for other reasons (the XML dispatch boundary, and deriving the control family off the corpus) and correctly did not take this — it is a different objective, in a different package, and it needs its own verification.
