---
id: d1d38484-bee1-5a96-8e1d-5ce5b4e91755
slug: eslint-directives-unadmitted-in-code
page-type-slug: finding
title: "The toolchain recognises four comment forms the list does not name, and the direction this was filed in has reversed"
domain-slug: domain/code-comment
---

# Claim

This finding was filed pointing one way and the world now points the other, so it is restated rather than left to be acted on backwards. No tracked source file carries an `eslint-disable` comment. The mismatch that survives runs the opposite way: `tools/code-comment/forms.ts` carries recognisers for four forms `pages/list/code-comment-forms.list.md` does not name — `eslint suppression`, `js type`, `js satisfies` and `source map`. Nothing reports that, because the code refuses only the reverse case.

# Evidence

Filed by the seat dispatching the 2026-08-14 `review-instructions` reading of what is now `pages/list/code-comment-forms.list.md`, which raised it after cutting the form at `4b9c2735c`. That seat counted 23 files carrying `eslint-disable` in the code repository, every occurrence in a source file.

Re-measured 2026-08-27 in akasha, which replaced both repositories, on `main`. `git grep -n eslint-disable` outside `node_modules` returns four lines and no directive among them: two are finding pages, one of them this one, and `tools/tests/code-comment-scan.test.ts:14` is a fixture list body rather than a comment in code. Control: `git grep -l import -- '*.ts'` returns 8,664 files, so the search ran. The 23 are gone.

What stands instead is the reverse mismatch. `pages/list/code-comment-forms.list.md` names seven forms at lines 27-33. `tools/code-comment/forms.ts` declares eleven recognisers at lines 39-50, the four extra being `eslint suppression` (line 41), `js type` (46), `js satisfies` (47) and `source map` (49).

Only one direction is refused. `formsFrom` throws `FormUnrecognised` where the list names a handle no recogniser matches — "write a recogniser beside the others". The opposite case ends at `RECOGNISERS.filter((form) => handles.includes(form.handle))` on the last line of that function, which drops an unnamed recogniser and says nothing. So the four sit in the code unreachable and unreported, and a reader of either document alone sees a set that agrees with itself.

What this costs is a reader rather than a file today: a seat consulting `forms.ts` to learn what shapes are admitted reads four it may not write, and `Form Approval` reserves adding any of them to Alan.

Not measured: whether the four recognisers were ever reachable, or which of the two documents the repair belongs in. Not renamed: this page's slug still spells the old direction, and moving it would break what names it, so the correction stands in the body.
