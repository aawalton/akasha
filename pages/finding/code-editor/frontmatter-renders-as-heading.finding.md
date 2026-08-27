---
id: c75f9506-0fc2-56bd-84b7-4c6d0a057374
page-type-slug: finding
title: "Frontmatter renders as heading"
domain-slug: domain/code-editor
---

# Claim

A markdown file's YAML frontmatter renders as a heading above the document's real first heading, so every document in this estate opens with a spurious one.

# Evidence

Observed 2026-08-04 in the running editor at `http://127.0.0.1:9888/`, while verifying #17748's handback against a real file rather than the gate's fixture.

Opening `packages/infra/checks/__fixtures__/ast-unused/README.md` from Alan's monorepo gives a rendered pane whose first two elements are the words `type: local-context` set at heading size with a rule beneath, and only then the document's own `# ast-unused fixtures`. The file's first four lines are `---`, `type: local-context`, `---`, blank. `marked` reads `---\ntype: local-context\n---` as a setext heading followed by a horizontal rule, which is correct CommonMark for that text and wrong for what the text is.

It bears on this editor more than it would on a general one. Every instructions surface, every memory document, every project row and finding in the estate carries frontmatter, and several schemas make keys required — so this is not an occasional file but close to every markdown file Alan opens here.

It is not a failure of #17748's criteria, which name headings, lists, links and code blocks and say nothing about frontmatter, and the row's own gate criterion `C7.markdown` passes: its fixture has no frontmatter. The rendering is otherwise sound — 1 h1, 4 h2, 14 list items, no source on screen, no webview, inline code in monospace.

What I did not measure: whether any other renderer in the cut already strips frontmatter and could be reused, whether the frontmatter would read better hidden outright or shown as a small key-value block, and whether a document whose frontmatter contains a `---`-only value renders differently again.
