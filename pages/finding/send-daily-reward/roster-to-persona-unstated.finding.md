---
id: 2fbe67fc-4775-5dd6-a072-48e7288f4174
slug: roster-to-persona-unstated
page-type-slug: finding
title: "Roster to persona unstated"
domain-slug: domain/global
---

# Claim

`domains/tasks/persona-reward/send-daily-reward.md` does not say how a run gets from the roster to a persona. Its Definition scopes it to what one persona owes and steps 2, 3 and 4 are singular, while step 1 reads the whole roster — `--due-only` returned four or more personas on 2026-08-14. Nothing says whether a run works all of them, picks one, or is dispatched one per seat, and `reward-crossings` carries a `--slug` flag the document never mentions.

# Evidence

Filed by the seat dispatching the 2026-08-14 `review-instructions` reading of `domains/tasks/persona-reward/send-daily-reward.md`, from that reading's hand-back. Its report stands at `~/agents/claude-send-daily-reward-archivist-review-instructions/review-send-daily-reward.md`.

That reading named this the fork it most wanted ruled on, and wrote no line for it because which way it goes depends on how the task is meant to be dispatched. It reports the fork landing on the agent at the seam between step 1 and step 2, where either answer changes what a run does.

I confirmed the `--slug` flag myself: `ops persona reward-crossings --help` declares `--slug <slug>  Only this persona, matched on her slug`, and its own example is `--eso-day 2026-07-25 --slug ione --json`.

Not measured: I did not read the document's stages, so the singular scoping is that reading's. Nothing here says which dispatch shape was meant, and nothing here weighs it against `pages/finding/persona-reward/no-reward-recorded-delivered.finding.md`, which records that nothing has been delivered on any day sampled.
