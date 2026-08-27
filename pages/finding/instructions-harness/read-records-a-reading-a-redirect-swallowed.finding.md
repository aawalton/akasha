---
id: deeadc36-9f77-5ba2-8392-17e0644f165f
page-type-slug: finding
title: "Read records a reading a redirect swallowed"
domain-slug: domain/global
---

# Claim

`tools/read.ts` refuses to print into a pipe but accepts a redirect to a file, so a caller can record a reading of documents whose text never reached them.

# Evidence

`domains/folders/instructions-repo.md` states the intent under Recorded Reading: "It refuses to print into a pipe, so one call takes every path." The refusal message is explicit that the purpose is the body reaching the reader — "nothing was read — this is printing to a pipe, so no body would reach you and a record would have said one had."

Measured 2026-08-12 by an agent that did it. `bun tools/read.ts --file-path <19 paths> > /var/tmp/emaildom/reads.txt` exited 0, wrote 50,916 bytes across 1,142 lines into the file, and recorded 19 readings — every one of them reported "nothing on record says you have read it; the whole file follows". A subsequent `ops instructions write` against three of those paths passed `read-before-write`, `read-what-governs` and `read-the-schema` on the strength of readings whose text the agent had not seen. Among them were `domains/domain.md`, whose Rules section carries Every Changed Line, and `domains/folders/instructions-repo.md`, which the agent had not read in that session at all.

The two cases are not distinguishable by intent. An agent redirecting to a file is doing what an agent piping to `head` was doing — getting the record without paying the context — and the pipe case is refused by name while this one exits clean. A file redirect is also the cheaper mistake to make by accident, since it looks like saving the output to read afterwards.

What made it reachable here rather than hypothetical: an agent's read record was reset mid-session (the seat's corpus moved), so twenty owed readings of documents it had already read in that same conversation came back as unread, and the whole set was re-demanded at once. That is the moment the redirect is most tempting and least visible.

Not filed as a defect in the gates: the gates asked the right question and got a true answer. What is wrong is that `read.ts` can record a reading it did not deliver.
