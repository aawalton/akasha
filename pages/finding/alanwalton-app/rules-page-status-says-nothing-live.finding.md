---
id: 95a69b22-1de8-52bc-99a6-542ac554d5d4
slug: rules-page-status-says-nothing-live
page-type-slug: finding
title: "Rules page status says nothing live"
domain-slug: domain/alanwalton-app
---

# Claim

The live `email-rule-set` page opens with a bolded status paragraph reading "As of now EVERY case is still PROPOSED, so nothing auto-acts yet — the whole mailbox surfaces, which is the safe default", and 63 of the rows below it are marked LIVE. The paragraph is the first thing on the page and it tells a reader that the resolver takes no automatic action on Alan's mail. It does: 63 rules archive, unsubscribe or forward without asking.

# Evidence

`ops email rules show` prints the singleton page the watcher reads. Line 3 is the status paragraph, whose text is quoted in the Claim. Counting the machine table below it, `| LIVE |` matches 63 rows and `| PROPOSED |` matches 10.

The narrative case table above the machine table disagrees with the same paragraph in its own cells: cases 1, 2, 3 and 3a read "LIVE (Alan approved 2026-07-13)", "LIVE (Alan approved 2026-07-21)" and "LIVE (Alan approved 2026-07-11)", and case 12 and 12′ read plain "LIVE". So the paragraph was already false when those approvals were written into the rows beneath it, and each approval since has widened the gap without touching it.

What the paragraph claims is load-bearing rather than decorative. `packages/alanwalton/email/resolver/src/decide.ts` acts on a matching rule only when `r.status === "LIVE"`, and `packages/alanwalton/email/watcher/src/tick.ts` executes that decision — `archiveMessage` for `archive`, an unsubscribe then archive for `unsubscribe-archive`, and a `sendMessage` to `decision.forwardTo` followed by an archive for `forward`. "Nothing auto-acts yet" is the sentence a reader would rely on before promoting a rule or before deciding whether a missing email was filed by machine, and it names the wrong state of the mailbox.

It also states the remaining work wrongly: "Promoting cases to LIVE is the remaining go-live step (Alan's call …)" reads as a step not yet taken, when the rows record it as taken repeatedly across 2026-07-11, 07-13 and 07-21.

The standing finding `pages/finding/alanwalton-app/rules-push-writes-unparsed.finding.md` covers a different defect on the same page — that `ops email rules push` writes before parsing, so a rejected row is dropped silently. It says nothing about the status paragraph, and neither defect implies the other.

Read on 2026-08-08 while ingesting `dirty/code/packages-alanwalton-email-resolver-claude.md`, which was cut partly because this page carries its governing principle verbatim.
