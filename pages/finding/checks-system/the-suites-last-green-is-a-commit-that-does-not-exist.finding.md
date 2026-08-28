---
page-type-slug: finding
title: "The suite's last green is a commit that does not exist"
domain-slug: domain/checks-system
---

# Claim

The commit the test suite treats as its last green is not in this repository and cannot be. It names a history the repository merge left behind, so every run since that merge has asked for the whole suite, and will keep doing so until someone resets the file.

The suite is then cut off by its own deadline partway through. It says so. What it does not say is why, because the reason is a sentence that reads as a passing git hiccup.

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

THE CONSEQUENCE, SETTLED. The run is then bounded by a deadline, not by the work: `suite-runs.ts:146` takes `deadlineAt = repo.deadlineAt ?? Date.now() + CHECKS_CEILING_MS` and `:149` computes each batch's budget from what is left. Asking for all 581 files rather than a selection means the budget runs out first, and the suite stops partway.

Measured by the seat that owns the suite timing, on an idle box:

    load 6.24   123.1s      against a 120s ceiling
    load 7.84   122.8s
    load 8.94   123.0s
    under load ~38:  123.3s, 124.9s

A 0.3s spread across three idle readings, and near-total insensitivity to load. That is the signature of a deadline rather than a workload: a fixed amount of work stretches when the box is busy, and a deadline does not. The 123s is the ceiling being hit, not a suite that takes 123s.

ONE LINE, NOT TWO CALLS. An earlier draft of this finding left open whether two different runs were being compared, because the reported line appeared to carry both the success wording and the fallback wording. It carries one call. `report` at `suite-runs.ts:84` builds `${tally.tests} test(s) across ${tally.files} of ${asked} file(s)`, and `:167` appends `— ${chosen.reason}` to that detail. So `780 test(s) across 72 of 581 file(s) — git could not read what changed since d9e356a9` is a single line: 72 files reached, 581 asked for because `green` is dead, and the reason appended after the dash. That question is closed.

THE SUITE IS NOT SILENT ABOUT THIS, and the finding should not say it is. `report` at `:95-99` computes `unreached = asked - tally.files` and pushes a `suite-unfinished` refusal naming both numbers when it is above zero. Somebody thought about the unfinished case and reports it. The gap is only that the *cause* sits after an em-dash in the words of a transient fault.

THE MESSAGE IS THE DEFECT. "git could not read what changed" is what a passing fault looks like: a mid-rebase tree, a gc, a race. It is the sentence you skip. The true statement is that the recorded commit does not exist and no future run will change that. A seat watching this line for hours across seven runs read it as noise, correctly, because it is written as noise.

SEVEN RUNS, SEVEN FALLBACKS. Every run taken across the night took this branch — four commits hours apart, plus three quiet-box runs at `089353b6`, `457a6017` and `246f7564`. The success branch was not reached once.

WHY NOT REPAIRED HERE. The repair is to write a commit into `green`, and that asserts the suite passed at that commit. Nobody has established which commit that is. A wrong value is worse than the present state by exactly the amount that matters: today every test is asked for, and a bad green makes tests **not** run — the one failure this whole area is trying to avoid. Deleting the file reaches the same behaviour with an honest message (`:180`, "no commit is on record as green"), which may be the right act, but it is still a decision about what the suite's baseline is rather than a defect to quietly correct.

NOT MEASURED. What the suite costs, or how many of the 581 it reaches, once `green` names a commit that exists. Every timing here was taken with the fallback active, so none of them is a reading of the suite's actual runtime.
