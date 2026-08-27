---
id: 194e59e1-0bcd-5295-9c83-06bc1e5eac67
slug: widget-slug-maps-bound-to-nothing
page-type-slug: finding
title: "Widget slug maps bound to nothing"
domain-slug: domain/global
---

# Claim

Nothing binds the stoplight widgets' Swift per-slug symbol and label maps to the server constants that produce the slugs, so renaming a slug degrades a circle to a generic glyph and a raw camelCase label on Alan's device alone, where no CI step and no simulator can see it.

# Evidence

Found on 2026-08-07 while emptying `dirty/skills/alan-harness/findings.md`, which recorded it on 2026-07-28 with a working detector demonstrated but not committed. That document is queued for removal. Every reading below was re-taken against `~/code`.

The maps are keyed by payload slug. `packages/alanwalton/native-shell/ios-widget/InboxStoplightsWidget.swift:78` declares `INBOX_SYMBOL` and `:86` `INBOX_LABEL`, both read at `:167` and `:168` as `INBOX_SYMBOL[$0.inbox]` and `INBOX_LABEL[$0.inbox] ?? $0.inbox`. `ValuesStoplightsWidget.swift:95` declares `VALUE_SYMBOL`, read at `:194`. The `?? $0.inbox` fallback is where a renamed slug surfaces as its own raw text.

The server side is elsewhere. `INBOX_ORDER` and `VALUES_ORDER` are declared under `packages/shared/status-bar-access/src/`, in `inbox-stoplights.ts` and `daily-stoplights.ts`.

Nothing compares the two. `ops enforcement list` matches three mechanisms on widget or slug, and the only widget one is `check-widget-bucket-color-mirror`. Its own header scopes it to a different widget and different vocabularies: "Drift-guard over the two vocabularies the iOS project-counts widget copies by hand … COLOUR — the five bucket-colour literals … SHAPE — the fields of `struct ProjectCounts`". No arm of it reads a stoplight slug map.

A reorder is safe and a rename is not, and the failure is device-only: `build-sim.sh:118` strips `ValuesWidgetExtension.appex` from the installed bundle, so a simulator cannot render these at all, and `~/code` has no `.github/workflows`.

The class is checkable and the estate has already built one. The 2026-07-28 seat detected a synthetic rename cleanly with a set comparison over the live payload and the parsed Swift maps, and `check-widget-bucket-color-mirror` is the same shape for the neighbouring widget, with `widget-bucket-color-mirror.ts` beside it.

Not established: whether a slug has ever been renamed, and whether the guard should extend that check or stand alone.
