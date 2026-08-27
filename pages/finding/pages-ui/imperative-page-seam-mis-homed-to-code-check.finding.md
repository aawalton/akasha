---
id: d7a49db2-68d8-558a-ac9b-5edbd9393d54
slug: imperative-page-seam-mis-homed-to-code-check
page-type-slug: finding
title: "Imperative page seam mis homed to code check"
domain-slug: domain/global
---

# Claim

Project #18598's design work for a sanctioned imperative page read/write seam sat unstarted only because of mis-homing, not difficulty: filed under domain `code-check`, where it originated, it needs a `pages-ui` design decision no check repair can deliver, so it queued behind someone without that judgment until it was re-homed to `pages-ui` on 2026-08-11 — the initiative stays `code-check` since that is the aim served, while the domain is what the work is measured against.

# Evidence

Project #18598 (status `awaiting_lead_definition`, `live-on: deploy`, domain `pages-ui`, initiative `code-check`). Objectives, all unchecked: (1) a module needing to read or write pages imperatively — a queue-draining worker, an effect that must not key on what it read — gets a sanctioned form, so complying and escaping differ; (2) that form must not re-render on what it read, the incident the hooks exist to prevent; (3) every module escaping the boundary today is migrated onto it rather than exempted, so the check's reachability arm widens at zero rather than over a ratchet.

Split from #18447's first criterion, left not failed: #18447 widened a check, but this criterion needs a design change no check repair reaches — its verifying seat found every route wants a failing gate, a ratchet, or this seam.

The escape is not authors cutting corners. The sanctioned remedies today are the `useOptimistic*` wrappers, `usePagesSupabase`, and the cache readers — all hooks. Callers: a worker draining an offline queue, and a launch/foreground badge effect whose header states its read must stay imperative — an effect keyed on the count value is the incident #15578 fixed, so a hook would reintroduce it. All three modules documented the escape as their design, reading the rule as import hygiene on the directive-carrying file. #18447 repaired those headers by hand.

Objective 2 can go wrong quietly: a merely-imperative seam meets objective 1 while reintroducing #15578 — the incident was the re-render on the value read, not the hook.

Figures, from #18447's walk (unreproduced; reproducing it is this held work): of the check's entries, over two thousand modules are client-reachable, most with no directive; with the directive gate off, findings fall in a handful of files, roughly half `@shared/pages-access` config, the rest real. One site is corroborated by hand. Measurement dated: `pages/finding/code-check/client-boundary-directive-escape.finding.md`. Re-measure before planning.
