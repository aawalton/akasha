---
id: eaabd50c-3571-57c5-83d4-d04126a67dbd
page-type-slug: finding
title: "Temper snapshot drops priority"
domain-slug: domain/global
---

# Claim

The live temper task-completion automation does not copy `priority` into its snapshot, and every one of the 25 live `temper-task` rows carries one, so every temper snapshot loses it. The `temper-completed-task` page-type defines the field, so nothing refuses the write and nothing reports the loss.

The alanwalton twin of this rule does copy `priority`. The quarantined document describing the pair gave the asymmetry a reason that is false.

# Evidence

Read 2026-08-08 off the live `public.pages` rows, while emptying the quarantined `seeded-automations/task-completion.md`.

Automation `019dcaa3-e522-7a53-b8d1-d5e183d8caee` (`Temper Task: snapshot + advance recurrence on completion`, trigger page-type `019db533-f381-72c5-89ed-c2eb485e5e94`) is live and enabled. Its `create_page` action targets `temper-completed-task` and copies exactly twelve keys: `title`, `icon`, `taskPageId`, `completedAt`, `dueDate`, `rrule`, `description`, `link`, `scope`, `character`, `completionCardId`, `completionItemPath`. No `priority`, no `category`.

Its alanwalton twin `019dcaa3-d661-790d-be6f-7a331aa89d0d` copies eleven keys into `completed-task` and both `priority` and `category` are among them.

The target defines the field. `ops page list --type temper-completed-task --properties <bad> --full` refuses and enumerates every valid name for that page type; `category` and `priority` are both in the list. `--properties title,category,priority` on the same type then exits 0. The same probe on `temper-task` lists both as well.

The source populates it. With `--body-file` filters and `--count`:

- `priority is_not_empty` on `temper-task` → **25**
- `category is_not_empty` on `temper-task` → **0**
- total `temper-task` rows → **25**

So `category` is genuinely unused and `priority` is set on every row, and only `priority` is lost.

Nothing refuses the write: `ops enforcement list` names 242 mechanisms and none reaches automation row content. A `create_page` action naming a subset of the target's keys is valid, so the omission is silent at write time and invisible afterwards — the snapshot simply has no priority.

The only record of the asymmetry was the quarantined `packages/automation/orchestrator/docs/seeded-automations/task-completion.md`, and what it said is false: "(the temper-completed-task page-type carries no `category` / `priority`)". It is filed here because that document is being deleted.

Whether the fix is to copy `priority` or to drop it from the target is a decision, not an observation.
