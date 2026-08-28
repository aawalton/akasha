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

**The case also asserts two invariants.** That no glob survives expansion, and that every directory listed carries a `package.json`. `pages/domain/test.domain.md` carries **Delete Rather Than Repair** ("never repair it") and **Assert The Invariant**.

Not measured: whether `lib-async` and `addon-libraries` were renamed in the flattening or dropped; whether any other test asserts the pre-flattening layout.
