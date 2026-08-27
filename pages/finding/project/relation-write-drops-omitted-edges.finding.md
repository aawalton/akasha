---
id: 60bf7287-f09c-5892-a8d6-c5cfa30724a2
page-type-slug: finding
title: "Relation write drops omitted edges"
domain-slug: barred-meaning/project
---

# Claim

A wholesale `dependsOn` write through `ops project update --properties-file` replaces the relation array rather than merging into it, and nothing at the write boundary refuses it. The same omission-drop class IS refused for `tags`: `rejectWholesaleTagsSet` throws on any wholesale `tags`-set at `patchPage`, and the project verb's comment says this catches the drop "a CLI-layer delta-guard could only partially cover". The class is recognised and one member closed, while `dependsOn` is left open.

# Evidence

Read 2026-08-07 against `~/code`. Established by reading the write path rather than by executing a write, since the only live target would be a real project row.

`packages/shared/pages/access/src/guards.ts:84-86` is the whole of the guard: `rejectWholesaleTagsSet(op, set)` throws `WholesaleTagsSetError(op)` when `TAGS_KEY in set`, and tests that key alone. `patch.ts` calls it in `callPagePatch` beside `rejectDefinitionTier`, `rejectReadOnlyKeys` and `enforcePipelineScope`; no guard there inspects a relation array.

`packages/alanwalton/projects/cli/src/project/update.ts:219-225` makes the asymmetry deliberate rather than accidental. Reserved tags "are protected at the pages-access write boundary: `rejectWholesaleTagsSet` rejects ANY wholesale `tags`-set on patchPage / patchPageById, so a wholesale `--properties-file` tags-replace through this generic verb is refused there (for every page type), catching the omission-drop a CLI-layer delta-guard could only partially cover." The reasoning names the class in general; the remedy is levied on one key.

The verb's help states the write as verbatim storage and offers no merge affordance: `--properties-file` takes "a `{ propertySlug: value }` object — slug keys, stored verbatim", and `dependsOn`/`blocks` "accept either page ID strings or seq numbers" — a resolution step, not a merge step.

A quarantined document dated a live loss: adding one dependency dropped an existing one, the verb printing `updated` and a timestamp with no diff. It cited `project note add` as the append-safe counterpart proving the hazard known; that verb does not exist — `ops project --help` lists no `note` subcommand. The nearest live analogue is `ops project revise`, "the guarded alternative to a blind whole-field `update`".

Searched `~/memory/findings/` for `dependsOn`, `relation array` and `clobber` first. The `project` matches are about what an edge can express or how it is projected, none about a write dropping edges.
