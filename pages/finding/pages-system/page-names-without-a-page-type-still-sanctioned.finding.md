---
id: 9c0e05f2-7aaf-4b5c-9ad1-2ca1d56ab090
page-type-slug: finding
title: "Code still writes and looks for a page name carrying no page type"
slug: page-names-without-a-page-type-still-sanctioned
domain-slug: domain/pages-system
---

# Claim

What makes a file a page is the page type its name carries, yet two writers compose a page's path as `<dir>/<name>.md` and three readers deliberately look for that spelling. Every reader that derives a slug from such a file is deriving it from something that is not a page, so the fault is upstream of the readers rather than in them.

# Evidence

Composed with no page type: `tools/lib/oauth-page-push.ts:46` — `pageFileIn(root, dir, account) ?? \`${dir}/${account}.md\``. `tools/commands/code-editor/color.ts:117` — the same shape, `\`${domains}/${stateStandsAs(state)}.md\`` behind a `pageFileIn` that found nothing. In both, the fallback is the path taken when the page does not exist yet, which is the path a new one is written to.

Looked for deliberately: `tools/lib/seat-presence-read.ts:29` — `spellingsOf` returns `[\`${seatName}.seat.md\`, \`${seatName}.md\`]`. `tools/lib/seat-page-history.ts:53` — `spellingsIn` hands `git log` both spellings. `tools/lib/page-write-where.ts:58` — `last === \`${name}.md\`` accepts the bare form before the slug is derived.

Nothing on disk uses the bare spelling: all 13 files under `agent/seat` and all 14 under `agent/subagent` carry their page type, and across the whole git history of both trees 0 of 1,321 distinct paths were bare. So this is a sanction nothing exercises, which is why no check has ever fired on it.
