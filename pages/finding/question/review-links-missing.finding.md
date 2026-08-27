---
id: 0ae19652-68a2-5b66-931f-0f7cc46a1f9e
slug: review-links-missing
page-type-slug: finding
title: "Review links missing"
domain-slug: page-type/question
---

# Claim

In the question domain, the `question` page-type has no first-class way for an agent to point Alan at something to review before he answers: it carries `context` and `options` but no review-target links, and question-detail.tsx (packages/alanwalton/web/app/questions/question-detail.tsx) has nowhere to render one.

# Evidence

Source: project #15793 (someday_maybe, live-on deploy, domain question), captured notes only, no objective, moved off the retired `notes` attribute 2026-08-15.

Problem: questions often need to point Alan at something to review before he answers (a page, a rendered feature, a web-vs-native render check). The only `link` in code is the notification's own deep-link (the push's own landing spot), not a review target.

Design settled with Alan: multiple links per question, ordered — the web/native testing case wants the SAME destination as two entries (web URL + native deep link) so Alan can check the render on each platform. Each link tagged `platform: web | native`: web = a full URL; native = a deep link only (in-app target). Each link carries a `label` + `url`.

Data: new `links` property on `question`, created as data via `bun ops property-definition create` (never a migration). Shape: JSON array of `{label, url, platform}`, all required, with a JSON Schema. Constraint: native must be a deep link (reject full http(s)), web must be a full URL — enforced at the ask-alan CLI boundary, pinned to the real deep-link seam (decideOpenUrlRoute / safeInternalPath / appUrlOpen, DeepLinkOpenSync).

Agent affordance: repeatable `--web-link "<label>|<url>"` / `--native-link` flags through ask-alan.ts → attention-question.ts. UI: a "Review" section above the answer box in question-detail.tsx, threaded through both loaders (question-detail-loader.ts + resolveQuestionDetail).

Ownership: ask-alan CLI + property = athena; answer UI = astra's surface, may re-home at dispatch — explicitly flagged not to repeat the #15781 mis-route.

Capture was cut at a paragraph boundary; the above is only its head.
