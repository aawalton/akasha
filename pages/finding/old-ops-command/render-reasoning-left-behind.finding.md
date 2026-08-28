---
id: de45f960-8f32-5088-a9d6-e8c3e28b0252
slug: render-reasoning-left-behind
page-type-slug: finding
title: "Render reasoning left behind"
domain-slug: page-type/old-ops-command
---

# Claim

A moved render function arrives in the instructions repo without the reasoning that stood over it, because that reasoning was a docblock and the instructions repo admits no prose comment. Three of the ten verbs moved tonight print a field whose whole point is a mistake it prevents, and the sentence saying so now stands only in a code-repository file nothing calls.

# Evidence

Observed 2026-08-13, moving ten verbs across five namespaces under `move-command-bodies`.

`domains/code-comment.md` admits only the forms on `domains/lists/code-comment-forms.md`, of which `// command:` is the one a verb uses. A render function copied out of the code repository therefore arrives stripped of every docblock over it, and the command document beside it carries one Definition bullet and, under the current release, nothing else.

Three cases where what was stripped is load-bearing, all in `packages/shared/utils/system/src/system/`:

Over `renderInodePressure`: "Three-valued on purpose. `unknown` is what the verb prints when no mount on the host reports an inode ceiling: utilization is undefined rather than healthy, and printing `no` there would assert capacity nothing measured." A reader collapsing that arm removes a guard now reading as a spare branch.

Over `memory-pressure.ts`'s `SUBJECT` and `NOT_AUTHORITATIVE_FOR`: "A `PRESSURE: no` from this verb was correct while an agent tree was killed six minutes later — 24.8 GB against a 24.0 GB per-tree ceiling, host MemAvailable ~41 GB... the misreading is committed by this output." Both constants print every run and read as boilerplate; the incident is the only thing saying they are not.

Over `readTreeMemory`: "`perProcessKillPids` is empty here on purpose... nothing is being killed at read time, so the gross sum is the honest answer." The moved body passes `[]` with nothing saying why that is right rather than unfinished.

The help blocks carry some of this but none of those three sentences, and a help block speaks to a caller rather than to whoever edits the body next.

Each is an argument for a line on the verb's own command document, which the domain schema admits. Landing one is Alan's under Every Changed Line, which is why this is filed.

Re-measured 2026-08-27. The code repository was absorbed into akasha, so the file the three sentences stood in is gone and they now stand nowhere: `renderInodePressure` and `NOT_AUTHORITATIVE_FOR` match no tracked file but this page and its sibling under `pages/finding/ops-command/`. The bodies survive without them — `tools/lib/memory-reaper-global.ts:48` passes `perProcessKillPids: []` with nothing above it saying why that is right rather than unfinished, and the tree assessment it feeds stands at `tools/lib/memory-reaper-legs.ts:41` and `:100`.

Not measured: how many verbs already in `tools/commands/` are in the same position.
