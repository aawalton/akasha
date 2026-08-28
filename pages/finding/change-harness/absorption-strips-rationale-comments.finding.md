---
id: 1b19c56f-edb2-4298-96d7-4ae37a66975e
slug: absorption-strips-rationale-comments
page-type-slug: finding
title: "An absorption strips rationale comments, so findings about them go spent while their host files survive"
domain-slug: domain/change-harness
---

# Claim

Absorbing a repository strips the rationale comments out of the code it carries over, because a comment's content belongs in a domain rather than beside the code. A finding whose subject was one of those sentences therefore goes spent, while the file it was written against survives untouched. Read from the finding side this looks like the file was lost, and it was not.

The trap is that the two are indistinguishable from the finding alone. Its subject is gone either way. Only opening the host file separates a comment that was deliberately removed from code that never arrived, and nothing on the finding says which happened.

# Evidence

Read 2026-08-27 in akasha, after the absorption of five repositories.

`pages/refusal/comment-outside-the-forms.refusal.md` is the policy that causes it: a comment standing outside the approved forms is refused, and what it says is moved to a domain, where it is required reading and where a reader looking for what binds the path will find it.

Files that came across carry no comments at all. `tools/lib/bun-pty.ts` is 34 lines with none, `tools/lib/supervisor-exec.ts` 151 with none, `infra/cluster-checks/src/checks/check-functional-type.ts` 185 with none. Each is the live host of a finding that quoted its docblock.

Doctrine names cited from those comments now appear in no tracked source outside `pages/` and `dirty/`: `Agent Message Canon`, `Omit Needless Ink`, `Error-Body Hygiene` and `Double-Cast Pattern` each return zero files under `git grep`, against a control of 7507 files matching `export`.

The distinction that decides a deletion is this: a finding whose stated evidence was deleted is not the same as a finding whose defect was fixed. Where the host file survives and the behaviour is unchanged, the defect is live and only the sentence describing it has gone — and the code now says nothing about it either, so the finding is the sole remaining record.

Not measured: how many of the surviving host files carry a live defect their stripped comment used to describe. Each has to be opened; the finding cannot answer it, which is the whole point of this one.

Not measured: whether the content of the stripped comments reached a domain in every case, or only in some. The policy states where it goes; nothing measured here confirms it arrived.
