---
id: 29647dac-a2e1-591f-9ab7-a19e6187fb28
page-type-slug: finding
title: "Definition reading unstated"
domain-slug: list/code-comment-forms
---

# Claim

The Definition of `domains/lists/code-comment-forms.md` — "the shapes of comment a program parses" — has two readings: a program anywhere, or a program that runs in these two repositories. They differ on real entries, `eslint-disable` being parsed somewhere in the world and nowhere here. Four cuts have now applied the narrow reading in their commit messages, so the corpus behaves as though it is settled while the line does not say so.

# Evidence

Filed by the seat dispatching the 2026-08-14 `review-instructions` reading of `domains/lists/code-comment-forms.md`, from that reading's hand-back. Its report stands at `~/agents/claude-code-comment-forms-archivist-review-instructions/review-code-comment-forms.md`.

The four cuts that reading names are `8d709ed0a` (source map), `e94f5f723` (js type), `5b02ed05c` (js satisfies) and its own `4b9c2735c` (eslint suppression). I confirmed `4b9c2735c` landed and takes exactly one line out, and that its message gives the narrow reading as its ground: "no eslint in either repo to parse the directive".

The reading reports searching both repositories for an eslint dependency, an eslint config file and eslint mentions in comments, and finding none. I confirmed no config file stands at the code repository root.

Not measured: I did not re-run its searches, and nothing here says which reading Alan meant. The Definition sits inside what `page-types/domain.md` **Every Changed Line** reserves to him, so no reviewer dispatched by an agent can settle it — which is why it has now been raised rather than closed.
