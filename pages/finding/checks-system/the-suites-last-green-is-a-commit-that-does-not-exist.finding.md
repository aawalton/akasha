---
page-type-slug: finding
title: "The suite's last green is a commit that does not exist"
domain-slug: domain/checks-system
---

# Claim

The commit the test suite treats as its last green is not in this repository and cannot be. It names a history the repository merge left behind, so every run since that merge has fallen back to running every test, and will keep doing so until someone resets the file.

The fallback is the safe direction and the suite is not wrong to take it. What is wrong is that a permanent condition is reported in the words of a transient one, and the cost is paid on every run by everyone.

# Evidence

Found by chasing a line another seat had been seeing all night and treating as noise: `git could not read what changed since d9e356a9, so every test runs`, unchanged across four different commits hours apart.

THE FILE. `tools/lib/test-selection.ts:4-6` puts the state outside the repository:

    const STATE_DIR = `${homedir()}/.instruction-checks`
    const GREEN = `${STATE_DIR}/green`

`~/.instruction-checks/green` holds `d9e356a9e932b88440bffbba3ef28dcd5c24ff45` and was last written **2026-08-26 09:59**.

THE SHA IS NOT HERE. `git cat-file -t d9e356a9e932b88440bffbba3ef28dcd5c24ff45` answers `could not get object info`. It is not an ancestor of `HEAD`, not a valid object name, and not a short form of anything. `readGreen` at `:26-30` only checks the shape — `/^[0-9a-f]{40}$/` — so a well-formed sha from a history that no longer exists passes every test the reader applies.

The timestamp places it **before the repository merge**. `ad5e04f09`, the commit that stood the gates down so the merge could land, is 2026-08-26 20:34, ten hours later. So the last green ever recorded was recorded against the old repository, and the merge carried the working tree across without carrying that commit's history with it.

WHAT HAPPENS THEN. `selection` at `:181-184`:

    const changed = changedSince(root, green)
    if (changed === null) {
      return { ...all, reason: `git could not read what changed since ${green.slice(0, 8)}, so every test runs` }
    }

`all` is `{ files: tests, considered: tests }` — the whole suite. Every run takes this branch, and will take it forever: nothing in the flow rewrites `green` on a failed read, so the condition cannot clear itself.

THE MESSAGE IS THE DEFECT. Its wording — "git could not read what changed" — describes a read that failed, which is what a transient fault looks like: a mid-rebase tree, a gc, a race. It is the sentence you skip. The true statement is that the recorded commit does not exist and no future run will change that. A seat watching this line for hours across four commits read it as noise, correctly, because it is written as noise.

NOT ESTABLISHED, AND IT MATTERS. Another seat reports the suite at 123.0s against a 120s ceiling, with a spread of 0.3s across three idle readings and near-total insensitivity to load. Running the whole suite rather than a selection is an obvious candidate cause and this finding does not claim it, because the same seat also reports `72 of 581 files reached` — which is the wording of the **success** path at `:194-195`, not the fallback. Those two lines cannot come from one call to `selection`, which returns exactly one reason. So either two roots are being measured, or two runs are being compared. Settling that is the discriminating measurement and it has not been taken.

WHY NOT REPAIRED HERE. The repair is to write a commit into `green`, and that asserts the suite passed at that commit. Nobody has established which commit that is. A wrong value is worse than the present state by exactly the amount that matters: today every test runs, and a bad green makes tests **not** run — the one failure this whole area is trying to avoid. Deleting the file reaches the same behaviour with an honest message (`:180`, "no commit is on record as green"), which may be the right act, but it is still a decision about what the suite's baseline is rather than a defect to quietly correct.
