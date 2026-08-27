---
id: aaafc016-c038-5401-a1a6-a83ee8d8ee0d
page-type-slug: finding
title: "Deleting the backing domain removed two intents a theme still measures against"
domain-slug: domain/page-types-system
---

# Claim

Deleting `domains/page-type-backing.md` removed two intent lines that survive nowhere else: "Every page type is backed by files" and "A product reaches a page the same way whatever its backing". The theme `adopt-file-backed-pages` quotes both and names the deleted slug as its domain; the initiative `astra-views-over-files` quotes the second. A theme is now measured against an end no document states.

# Evidence

Recovered the deleted body with `git show` at commit e917ac420 and confirmed neither sentence appears in `domains/` or `page-types/` today. I deleted the document myself, judging it an empty parent, and did not check what quoted it: a removal reports broken links within one repo, and a memory-repo theme quoting an instructions document is a link neither sees. Whether the second intent still means anything now that one backing exists is unsettled.
