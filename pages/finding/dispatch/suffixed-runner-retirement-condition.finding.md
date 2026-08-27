---
id: 29575f12-ba77-5dfa-be13-9481fa94e867
page-type-slug: finding
title: "Suffixed runner retirement condition"
domain-slug: domain/dispatch
---

# Claim

`suffixed-runner`'s `retiredBy` needs a successor project because #17325's dispatch family rename (`project`→`manage`, `worker`→`deliver`) does not retire it: its specimen composes to `deliver-17320b`, which no permanent family admits, so the family survives respelled to admit both prefixes. At capture, 3 live seats and 114 `~/agents/` directories (8 suffixed) still carried the old spelling — the tolerance stays until both counts reach zero, not until the rename lands.

# Evidence

Project #17332, domain `dispatch`, status someday_maybe, live-on deploy. Captured, not defined.

Dropped from the earlier batch because #17325 needed a real seq for `suffixed-runner.retiredBy` and correctly refused to invent one.

#17325 renames the dispatch families (`project`→`manage`, `worker`→`deliver`) and deletes the dead `deploy` family, so `dispatch` falls out mechanically: its specimen composes to `manage-17314`, which the permanent `project-scoped` family already admits, and the declaration's own unit test forbids a member redundant against the permanent set.

`suffixed-runner` does not fall to that test. Its specimen composes to `deliver-17320b`, and no permanent family admits it — `{role}-{seq}[-]{suffix}` with a non-numeric suffix is neither `project-scoped` nor `project-scoped-indexed`. Deleting the entry would make `isDeclaredAgentName("worker-15582-oom")` false and refuse a rebind of the `-build` / `-exec` long-runner shape. So the family survives, respelled to admit both prefixes, and its `retiredBy` needs a successor — this project is it.

Population at capture: 3 live seats hold an old-spelling name (`worker-17317`, `worker-17325`, `worker-17326`); 114 old-spelling directories under `~/agents/`, 8 suffixed (`worker-15582-oom`, `project-16055-land`, `worker-16047b`). Not a drained population, so the tolerance is kept rather than removed now — add-before-remove: it goes when the population it protects reaches zero, not when the rename lands.

Condition: the tolerance may be removed when no live seat and no `~/agents/` directory carries an old-spelling name. Both halves matter — a seat needs to stay rebindable, a directory reapable; checking only seats would strand 114 directories nothing could reap by name. State the check as two commands whose output is the evidence, not a belief time has passed: a tolerance kept past its population is indistinguishable from a rule.

Moved off the row's retired `notes` attribute on 2026-08-15.
