---
id: af42b4f8-d853-5bb0-acdf-ecbfa7c9233e
slug: chapter-landing-map-collapse
page-type-slug: finding
title: "Chapter landing map collapse"
domain-slug: role/scenewright
---

# Claim

Project #17344 proposes making scene-landing and the durable scenewright map one act — a chapter that records what a session tested becomes the map entry, making the domain's use-without-confirmation exit rule queryable for the first time — and its own exploration found the typed-markdown projector path this depends on already built and live under four other stories, while the domain's one hand-assembled chapter already produced a real defect from the manual path it would replace.

# Evidence

Project #17344, domain `scenewright`, status someday_maybe, live-on deploy. Captured, not defined.

Proposal: one write lands the chapter and records what the session tested (ask, devices, and, when given, the read), turning the map into a query over chapters — an exit rule refreshes an entry on a used-and-read session, else stays unrefreshed, unimplementable in prose.

Gap evidence: the first prose chapter landed by hand (four CLI calls, hand-stripped title block, hand-computed word count, hand-built properties file); `narrator` was written as prose where the audio rail reads a voice slug, so `story prerender-audio` would fail to resolve one, found by inspection not a control. ~40 personas exist, one chapter.

Constraints: not a second copy (row is the record); not a schedule (re-confirmation rides an already-happening session, Consume on Demand); not inference (only what Alan says is a read). Out of scope: `story prerender-audio`/`-image` render off `story-chapter`'s `mediaConfig`.

Exploration (2026-07-30T12:10:46.630Z): two rows exist — `authored-story` **Close Range** (`019fb2d8-6076-…`, slug `close-range`, narrator `mari`, `chapterCount 1` hand-written, `package`/`sourcePath` empty); `story-chapter` **Athena** (`019fb2d8-b074-…`, seq 16229, `chapterNumber 1`, `maturityRating R`, `source persona-authored`, text content-tier, not in `attributes`). `bun ops persona digest mari` shows only this one.

Alternative, live: `packages/stories/authored/`, a typed-markdown projector — file at `<story>/chapters/NNN-<slug>.md`, frontmatter `pageType`, `bodyField: text`, `story`, `chapterNumber`, `wordCount`, rest as properties; `docs-export` reconciles into `public.pages` (`packages/infra/ci/cli/src/lib/pipeline-subscription.ts`). Four stories run on it: `cornerstone`, `tower-of-nimue`, `the-beholder`, `plato-apology-crito`.

Capture stopped mid-paragraph before three cleared checks; above is its head.

Moved off the row's retired `notes` attribute on 2026-08-15.
