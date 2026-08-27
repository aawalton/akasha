---
id: 1bf4506a-af8d-5a7e-bafc-a10b57aa2076
slug: subject-carries-two-senses
page-type-slug: finding
title: "Subject carries two senses"
domain-slug: domain/global
---

# Claim

`subject` carries two senses across the corpus and no domain declares it. In the person sense it means the one being interviewed: 5 uses on `domains/roles/recorder.md`, 1 on `domains/roles/interviewer.md`. In the document sense it means the file being worked on: 2 on `review-instructions.md`, 4 on `review-documents.md`, 7 on `loop.md`. Grepping for a `subject` domain-slug returns nothing. Plain Or Declared asks for one or the other.

# Evidence

Raised by a review-instructions seat on `domains/roles/recorder.md`, which did not land it: the collision spans documents outside its subject and every site is a Definition or a task line. Its recommendation, offered as the smaller edit, is to declare `subject` as a domain in the person sense and let the task documents say `document`.

I verified the counts and the absence myself with grep on 2026-08-07. No file under `domains/` declares `domain-slug: subject`.

This is a horizontal claim rather than a local one, so `domains/role.md` Horizontal Change puts landing it in one run on whoever takes it, rather than in a dispatched reading. Declaring a new domain is `define-domain-structure` work.

Not measured: whether the two senses have ever been confused in practice. Each site disambiguates itself in context, which is why nothing has surfaced it before. The seat filing this uses the document sense four times in its own task document.
