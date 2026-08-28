---
id: 28aa2c4d-8687-56ec-924a-bcd6ef21f165
page-type-slug: finding
title: "A workspace-paths case asserts a layout the repository no longer has"
domain-slug: domain/repo-system
---

# Claim

The real-repo case in `shared/workspace-paths/src/index.unit.test.ts` fails, and moving its root does not fix it. Its root climbs one level too far, and correcting that would still leave it asserting two package directories that the repository does not contain under any prefix.

# Evidence

Read and run 2026-08-28 by seat astra.

**The root is wrong.** Line 13 is `const REPO_ROOT = join(import.meta.dir, "..", "..", "..", "..")`. The file sits at `shared/workspace-paths/src/`, so four climbs reach `/var/home/walton/repos`, which holds no `package.json` — the `ENOENT` the failure reports. Three climbs would reach the akasha root, which does hold one, declaring 264 workspace entries.

**Three climbs would not make it pass.** Lines 106-107 expect `packages/temper/shared/addon-libraries/lib-async` and `packages/temper/game/collections/antiquities/capture/host`. There is no `packages/` directory in the repository at all, and every workspace entry is top-level — `alanwalton/calendar-sync`, `infra/git-transport`, `lua-compiler/vendor/*`.

**One of the two survives under a flattened name.** `temper/game-collections-antiquities-capture-addon` and `…-capture-core` exist. The nested path was flattened into a hyphenated stem, so the directory the case names is gone by design rather than by loss. `lib-async` and `addon-libraries` return nothing anywhere in the tree.

**It is not fallout from tonight's work.** It fails identically before and after the 2026-08-28 scratch-directory repairs, established by the agent that made those repairs while checking whether it had caused it.

**The function itself is exercised.** Every other case in the file builds a fixture repository under a temporary directory and passes, so `listWorkspaceDirs` is under test independently of this one.

# Bearing

`pages/domain/test.domain.md` carries **Delete Rather Than Repair** — "Delete a test that fails while nothing is wrong; never repair it", and "A retry or a skip is still a repair." Changing four `".."` to three is a repair, and it would not make the case pass.

The same domain carries **Assert The Invariant** — "An assertion about one case breaks while nothing is wrong, and its repair checks nothing." Lines 106-107 name two particular packages, which is a detail of the case at hand.

But the same case also asserts two things that are invariants: that no glob survives expansion, and that every directory it lists carries a `package.json`. So deleting the case whole loses two invariants, and repairing it breaks the rule. That is the decision this page is for, and it is deliberately not made here.

Not measured: whether `lib-async` and `addon-libraries` were renamed in the flattening or dropped. Not measured: whether any other test asserts the pre-flattening layout.
