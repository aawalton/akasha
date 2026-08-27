---
page-type-slug: finding
id: 2fdb3c62-da90-5207-b7de-6e16c63f8d35
title: "A page query naming the wake day is answered with the calendar day"
domain-slug: domain/page-query-language
---

# Claim

A page query naming `wake-day` is answered with the calendar day rather than refused, so a query written against the wake day reads a day that is not the one it names, and the number it returns looks ordinary.

# Evidence

`page-query-times` lists `wake-day` among the points in time a page query can name, alongside `now`, `eso-day` and `eso-day-next`. `page-query-language` carries "A page query can name the wake day" under Intent rather than Design.

Only one place resolves those names, `packages/shared/pages/ui/src/supabase/view-data-of-page.ts`, and it collapses every one of them to the same value:

    function boundAbove(raw: unknown): Bound {
      const text = textOf(raw)
      if (text === undefined || !QUERY_TIMES.has(text)) return { operator: "gte", value: raw }
      return text === "eso-day-next"
        ? { operator: "gt", value: TODAY }
        : { operator: "gte", value: TODAY }
    }

`now`, `eso-day` and `wake-day` all return `TODAY`. Nothing there reads a sleep session, which is what `wake-day` says its boundaries are worked out from.

The page query service answers nothing about these names at all: no occurrence of `wake-day`, `eso-day` or `QUERY_TIMES` stands under `packages/shared/pages/query/src` or `packages/shared/pages/core/src`. A query reaching the service through `askComposed` carries the word through as a literal.

So the word is accepted in both paths and honoured in neither. A wake day whose waking fell either side of midnight is answered with the calendar day instead, and the caller is told nothing.
