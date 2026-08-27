---
id: 0eee376c-ec16-5dde-be33-334e6c185b41
page-type-slug: finding
title: "Tapped answer reaches no asker"
domain-slug: domain/agent-harness
---

# Claim

A tapped answer reaches an asking agent with no wake at all, and the suppression reads only the tap — never whether anyone is waiting on it. `resolveQuestion` skips the whole delivery branch whenever the claimed option index verifies against the row's `options`, so a seat that attached `--option` and stopped is answered on the row and pushed nothing. `ops ask-alan --help` recommends `--option` for any enumerable answer space, so the shape getting no push is an ordinary ask rather than an edge case.

# Evidence

Read 2026-08-07 in `packages/alanwalton/web/app/questions/lib/resolve-question.server.ts`.

The branch is `if (tappedIndex === null) { … resolveAsker … deliver … }` at lines 323-331. `tappedIndex` comes from `selectTappedOptionIndex({ options, claimedIndex, content })`, which reads the row and the request and nothing else. Non-null, and both `resolveAsker` and `deliver` are skipped; control falls to the `patchPage` flipping `status` to `answered`. Nothing on the row, and no argument to the seam, turns the delivery back on.

The docblock states the design as intended: "a structured answer must cost no agent attention, because only a custom response needs interpretation", citing Alan's constraint on programmatic confirmation loops. The suppression is deliberate; the asker who is genuinely waiting is what is unhandled.

`ops ask-alan --help` recommends the flag that triggers it — "repeatable --option (quick-answer choices)" — offered as enrichment on any ask, while stating the asking bar as "someone must be blocked on the answer". Those two together describe an asker who is blocked and has options attached.

The latch clears, so this is a missing notification rather than a stuck seat: `openQuestionsWhere()` matches `status = 'open'` and the tapped path flips it, so `outbound-wake.ts`'s `openQuestions > 0` verdict releases. No wake fires — the `question-answer` source on every persona's standing spec fires only from `deliver`.

Not measured. How many answered questions carry `answeredOptionIndex` with a stopped asker; no rows were queried. Whether any seat has missed an answer this way. Whether a boot digest surfaces an answered question to a persona restarting for another reason.
