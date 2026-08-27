---
id: d55b5696-f63d-5d73-a28c-79756628a98c
slug: the-one-settled-remedy-is-the-missing-one
page-type-slug: finding
title: "The one settled remedy is the missing one"
domain-slug: page-type/refusal
---

# Claim

`refusals/hook-inert.md` omits the one way out of three that its own check settles: `hooks-registered.ts` takes any file under `tools/hooks/` to claim it is a hook, so a helper parked there belongs in `tools/lib/` — and a reader who cannot see that registers the helper as a hook and fires it on every call.

# Evidence

Measured 2026-08-11, on a `review-instructions` reading of `refusals/hook-inert.md` dispatched from `review-documents`. The reading found it and declined to land it.

The body: "`{path}` is named by no registration in `settings/agents.json` and by no entry in `domains/lists/disabled-hooks.md`, so it never runs and nothing says why."

Three ways out. Register it; declare it disabled; or move it, because it is not a hook. The first two are legible from the sentence. The third is not, and it is the one an instrument settles — `tools/checks/hooks-registered.ts` treats presence under `tools/hooks/` as the claim itself, so a helper sitting there belongs in `tools/lib/` rather than in either document the body names.

That makes this the one missing-remedy case in the pass where `domains/tasks/archivist/review-instructions.md` would admit an Add: it allows one "only where an instrument settles what it should say".

The harm from the omission is specific rather than general. A reader shown two ways out, both of which register the file as a hook, takes one — and fires a helper on every call.

The reading left it because answering it here would settle for the whole family the question already standing at `pages/finding/refusal/remedy-unsettled-at-the-schema.finding.md` and its four siblings.

Not measured: whether any file currently sits under `tools/hooks/` unregistered, or how many other bodies omit an instrument-settled remedy while naming the unsettled ones.
