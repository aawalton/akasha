---
id: c435924e-42e7-54f2-9e71-835e60c40566
slug: popover-cap-refused-in-its-own-spelling
page-type-slug: finding
title: "Popover cap refused in its own spelling"
domain-slug: domain/global
---

# Claim

`check-popover-viewport-safety` refuses a caller that restates the wrapper's own viewport cap in the Tailwind 4 shorthand, while admitting the same cap in the bracket form. Four of the six live wrappers spell their cap in the shorthand, so an author copying the class string out of the wrapper they are consuming is refused for writing exactly what it writes. Nothing in the tree carries the shape today, so this costs nobody yet.

# Evidence

Reproduced by dalla on 2026-08-11 on a reflink copy of `project-18682`, using a seventh wrapper planted in `packages/shared/design/primitives` so the derivation would govern it:

  className="max-w-[var(--radix-tooltip-content-available-width)]"  → exit 0
  className="max-w-(--radix-tooltip-content-available-width)"       → exit 1

The check's own remedy sentence offers the bracket form, so following the refusal does clear it — the author is told to rewrite a token that was already correct.

`grep -c "max-w-(--radix"` over `packages/shared/design/primitives/src/components/` returns one each in `context-menu.tsx`, `dropdown-menu.tsx`, `menubar.tsx` and `select.tsx`. `popover.tsx` and `hover-card.tsx` use the bracket form.

Found and reported by #18601's seat, which correctly judged it outside that project: the defect is in `classifyMaxWidthToken`'s token rule, where that project's objective was the derivation of the governed tag set.
